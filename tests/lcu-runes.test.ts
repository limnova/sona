import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { lcu, type RunePage } from '@/lib/lcu'

const page = { name: 'Sona - Sona', primaryStyleId: 8000, subStyleId: 8100, selectedPerkIds: [1, 2, 3, 4, 5, 6] }
const fetchMock = vi.fn<typeof fetch>()
function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status })
}

beforeEach(() => { vi.stubGlobal('fetch', fetchMock); fetchMock.mockReset() })
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('符文写入取消', () => {
  it('已取消的请求不读取符文页', async () => {
    const controller = new AbortController()
    controller.abort()
    await expect(lcu.applyRunePage(page, controller.signal)).rejects.toMatchObject({ name: 'AbortError' })
    expect(fetchMock).not.toHaveBeenCalled()
  })
  it('读取页面后会话失效，不执行更新或删除', async () => {
    const controller = new AbortController()
    vi.spyOn(lcu, 'getRunePages').mockImplementation(async () => {
      controller.abort()
      return [{ id: 1, ...page, current: true }]
    })
    await expect(lcu.applyRunePage(page, controller.signal)).rejects.toMatchObject({ name: 'AbortError' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('更新完成时会话失效，不删除其他符文页', async () => {
    const controller = new AbortController()
    vi.spyOn(lcu, 'getRunePages').mockResolvedValue([
      { id: 1, ...page, current: true }, { id: 2, ...page, current: false },
    ])
    vi.spyOn(lcu, 'updateRunePage').mockImplementation(async () => {
      controller.abort()
      return { id: 1, ...page, current: true }
    })
    await expect(lcu.applyRunePage(page, controller.signal)).rejects.toMatchObject({ name: 'AbortError' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('创建取消后不回退覆盖用户现有符文页', async () => {
    const controller = new AbortController()
    vi.spyOn(lcu, 'getRunePages').mockResolvedValue([{ id: 1, name: '用户符文', current: true } as RunePage])
    vi.spyOn(lcu, 'createRunePage').mockImplementation(async () => {
      controller.abort()
      throw new DOMException('cancelled', 'AbortError')
    })
    await expect(lcu.applyRunePage(page, controller.signal)).rejects.toMatchObject({ name: 'AbortError' })
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('有效会话照常更新管理页并清理重复页，信号传递到请求', async () => {
    const controller = new AbortController()
    fetchMock.mockResolvedValueOnce(response([
      { id: 1, ...page, current: true }, { id: 2, ...page, current: false },
    ])).mockResolvedValueOnce(response({ id: 1, ...page, current: true }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
    await lcu.applyRunePage(page, controller.signal)
    expect(fetchMock.mock.calls.map(([url, init]) => [url, init?.method])).toEqual([
      ['/lol-perks/v1/pages', 'GET'], ['/lol-perks/v1/pages/1', 'PUT'], ['/lol-perks/v1/pages/2', 'DELETE'],
    ])
    expect(fetchMock.mock.calls.every(([, init]) => init?.signal === controller.signal)).toBe(true)
  })

  it('有效会话创建失败时仍可回退到当前可编辑页', async () => {
    fetchMock.mockResolvedValueOnce(response([{ id: 1, name: '用户符文', current: true }]))
      .mockResolvedValueOnce(response({}, 500))
      .mockResolvedValueOnce(response({ id: 1, ...page, current: true }))
    await expect(lcu.applyRunePage(page)).resolves.toMatchObject({ id: 1, name: page.name })
    expect(fetchMock.mock.calls.map(([, init]) => init?.method)).toEqual(['GET', 'POST', 'PUT'])
  })
})

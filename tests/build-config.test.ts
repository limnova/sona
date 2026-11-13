import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build, loadConfigFromFile } from 'vite'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const configFile = fileURLToPath(new URL('../vite.config.ts', import.meta.url))
const temporaryRoot = path.resolve(tmpdir())
let fixtureDir: string
let outDir: string
let installedDir: string
let entry: string

beforeEach(async () => {
  fixtureDir = await mkdtemp(path.join(temporaryRoot, 'sona-build-'))
  outDir = path.join(fixtureDir, 'dist')
  const loaderPath = path.join(fixtureDir, 'loader')
  installedDir = path.join(loaderPath, 'plugins', 'sona')
  entry = path.join(fixtureDir, 'entry.ts')
  vi.stubEnv('PENGU_LOADER_PATH', loaderPath)

  await mkdir(path.join(installedDir, 'assets'), { recursive: true })
  await writeFile(path.join(installedDir, 'index.js'), 'old installed plugin')
  await writeFile(path.join(installedDir, 'assets', 'custom.png'), 'custom asset')
  await writeFile(path.join(fixtureDir, 'package.json'), JSON.stringify({ name: 'sona-build-fixture', type: 'module' }))
  await writeFile(entry, [
    'import "./style.css"',
    'export function init() {}',
    'export function load() {}',
    'export const icon = "/assets/icon.png"',
  ].join('\n'))
  await writeFile(path.join(fixtureDir, 'style.css'), 'body { color: red; }')
})

afterEach(async () => {
  vi.unstubAllEnvs()
  if (!fixtureDir) return
  if (path.dirname(fixtureDir) !== temporaryRoot || !path.basename(fixtureDir).startsWith('sona-build-')) {
    throw new Error('Refusing to remove an unexpected build fixture directory')
  }
  await rm(fixtureDir, { recursive: true, force: true })
})

function buildFixture(mode = 'production', source = entry) {
  return build({
    configFile,
    root: fixtureDir,
    mode,
    logLevel: 'silent',
    build: {
      outDir,
      emptyOutDir: true,
      lib: { entry: source },
    },
  })
}

describe('Pengu 构建与安装', () => {
  it('开发配置保留 HTTPS 证书插件和 Pengu 开发入口', async () => {
    const loaded = await loadConfigFromFile({ command: 'serve', mode: 'development' }, configFile)

    expect(loaded?.config.plugins).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'vite:plugin:mkcert' }),
      expect.objectContaining({ name: 'pengu-serve' }),
    ]))
  })

  it('普通构建生成完整插件，保留已有安装', async () => {
    await buildFixture()

    const output = await readFile(path.join(outDir, 'index.js'), 'utf8')
    expect(output).toContain('@author WJZ_P')
    expect(output).toContain('import "./index.css";')
    expect(output).toContain('//plugins/sona/assets/icon.png')
    expect(await readFile(path.join(outDir, 'index.css'), 'utf8')).toContain('color:red')
    expect(await readFile(path.join(installedDir, 'index.js'), 'utf8')).toBe('old installed plugin')
    expect(await readFile(path.join(installedDir, 'assets', 'custom.png'), 'utf8')).toBe('custom asset')
  })

  it('显式安装更新产物并保留用户自定义资源', async () => {
    await buildFixture('install')

    for (const file of ['index.js', 'index.css']) {
      expect(await readFile(path.join(installedDir, file), 'utf8'))
        .toBe(await readFile(path.join(outDir, file), 'utf8'))
    }
    expect(await readFile(path.join(installedDir, 'assets', 'custom.png'), 'utf8')).toBe('custom asset')
  })

  it('构建失败时不加工旧产物或覆盖已安装插件', async () => {
    await mkdir(outDir)
    await writeFile(path.join(outDir, 'index.js'), 'old build output')

    await expect(buildFixture('install', path.join(fixtureDir, 'missing.ts'))).rejects.toThrow()

    expect(await readFile(path.join(outDir, 'index.js'), 'utf8')).toBe('old build output')
    expect(await readFile(path.join(installedDir, 'index.js'), 'utf8')).toBe('old installed plugin')
    expect(await readFile(path.join(installedDir, 'assets', 'custom.png'), 'utf8')).toBe('custom asset')
  })
})

import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

// 独立于 Pengu 构建配置，测试不会复制或删除插件安装目录。
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
    environment: 'node',
  },
})

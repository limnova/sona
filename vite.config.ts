import { defineConfig, type Plugin, type ResolvedConfig, type UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

// Read plugin config from package.json
const PROJECT_ROOT = fileURLToPath(new URL('.', import.meta.url))
const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf-8'))
const PLUGIN_NAME: string = pkg.config.pluginName
const LOADER_PATH: string = process.env.PENGU_LOADER_PATH ?? pkg.config.loaderPath
const PLUGINS_DIR = path.resolve(PROJECT_ROOT, LOADER_PATH, 'plugins', PLUGIN_NAME)

/**
 * Pengu Loader Dev Server Plugin
 * - Generates an index.js entry in the plugins directory
 * - Points to the local Vite dev server for HMR
 */
function penguServe(): Plugin {
  let port: number

  return {
    name: 'pengu-serve',
    apply: 'serve',

    configureServer(server) {
      server.httpServer?.on('listening', () => {
        const addr = server.httpServer!.address()
        if (addr && typeof addr === 'object') {
          port = addr.port
        }

        // Ensure plugins directory exists
        fs.mkdirSync(PLUGINS_DIR, { recursive: true })

        // Write dev entry index.js
        // React Fast Refresh requires both the React preamble and `@vite/client`.
        // Since Pengu loads the module directly instead of via Vite-transformed HTML,
        // we must install the preamble manually before importing React modules.
        const devEntry = [
          `const reactPreamble = import("https://localhost:${port}/@react-refresh").then(({ injectIntoGlobalHook }) => {`,
          `  injectIntoGlobalHook(window);`,
          `  window.$RefreshReg$ = () => {};`,
          `  window.$RefreshSig$ = () => (type) => type;`,
          `  window.__vite_plugin_react_preamble_installed__ = true;`,
          `}).catch(e => {`,
          `  console.error("[Sona] Failed to install react preamble:", e);`,
          `  throw e;`,
          `});`,
          `const viteClient = reactPreamble.then(() => import("https://localhost:${port}/@vite/client")).catch(e => {`,
          `  console.error("[Sona] Failed to load vite client:", e);`,
          `  throw e;`,
          `});`,
          `const pluginModule = () => viteClient.then(() => import("https://localhost:${port}/src/index.tsx")).catch(e => {`,
          `  console.error("[Sona] Failed to load plugin module:", e);`,
          `  throw e;`,
          `});`,
          ``,
          `export function init(context) {`,
          `//  console.log("[Sona] init called");`,
          `  pluginModule().then(m => m.init(context)).catch(e => console.error("[Sona] init error:", e));`,
          `}`,
          ``,
          `export function load() {`,
          `//  console.log("[Sona] load called");`,
          `  pluginModule().then(m => m.load?.()).catch(e => console.error("[Sona] load error:", e));`,
          `}`,
        ].join('\n')

        fs.writeFileSync(path.join(PLUGINS_DIR, 'index.js'), devEntry)
        console.log(`\n  ⚡ Pengu plugin "${PLUGIN_NAME}" dev entry generated`)
        console.log(`  📁 ${PLUGINS_DIR}\n`)
      })
    },

    // Transform asset paths in non-JS files to point to dev server
    transform(code, id) {
      if (/\.(ts|tsx|js|jsx)$/.test(id)) return
      return code.replaceAll('/src/', `https://localhost:${port}/src/`)
    },
  }
}

/**
 * Pengu Loader Build Plugin
 * - Patches asset paths for PenguLoader's plugin protocol
 * - Installs build output only in explicit install mode
 */
function penguBuild(): Plugin {
  let config: ResolvedConfig

  return {
    name: 'pengu-build',
    apply: 'build',

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    writeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir)

      // Remove index.html (not needed for plugins)
      const htmlPath = path.join(outDir, 'index.html')
      if (fs.existsSync(htmlPath)) {
        fs.unlinkSync(htmlPath)
      }

      // Process index.js - patch asset paths and import plugin styles
      const jsPath = path.join(outDir, 'index.js')
      if (fs.existsSync(jsPath)) {
        let js = fs.readFileSync(jsPath, 'utf-8')

        // Fix asset paths: /assets/ -> //plugins/sona/assets/
        js = js.replaceAll('"/assets/', `"//plugins/${PLUGIN_NAME}/assets/`)
        js = js.replaceAll("'/assets/", `'//plugins/${PLUGIN_NAME}/assets/`)

        // Add CSS import at top
        js = `import "./index.css";\n${js}`

        // Pengu Loader 插件头注释（识别插件元信息用）
        const banner = [
          '/**',
          ' * @name Sona',
          ` * @version ${pkg.version}`,
          ' * @description 基于 Pengu Loader 的国服英雄联盟排位分析插件',
          ' * @author WJZ_P',
          ' * @link https://github.com/limnova/sona',
          ' */',
          '',
        ].join('\n')
        js = banner + js

        fs.writeFileSync(jsPath, js)
      }

      // Process index.css - fix asset paths
      const cssPath = path.join(outDir, 'index.css')
      if (fs.existsSync(cssPath)) {
        let css = fs.readFileSync(cssPath, 'utf-8')
        css = css.replaceAll('url(/assets/', 'url(./assets/')
        fs.writeFileSync(cssPath, css)
      }

      if (config.mode !== 'install') return

      // Preserve custom assets and other user files in the installed plugin.
      fs.mkdirSync(PLUGINS_DIR, { recursive: true })
      copyDirSync(outDir, PLUGINS_DIR)
      console.log(`\n  ✅ Plugin "${PLUGIN_NAME}" installed to ${PLUGINS_DIR}\n`)
    },
  }
}

function copyDirSync(src: string, dest: string) {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true })
      copyDirSync(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

export default defineConfig(async ({ command }): Promise<UserConfig> => ({
  define: {
    __PLUGIN_VERSION__: JSON.stringify(pkg.version),
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [
    react(),
    command === 'serve' && (await import('vite-plugin-mkcert')).default(),
    penguServe(),
    penguBuild(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(PROJECT_ROOT, 'src'),
    },
  },
  server: {
    port: 3000,
    https: {},
    origin: 'https://localhost:3000',// 必须加这个，否则引入图片资源等会失败
  },
  build: {
    outDir: 'dist',
    reportCompressedSize: false,
    lib: {
      entry: path.resolve(PROJECT_ROOT, 'src/index.tsx'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.[0]?.endsWith('.css')) return 'index.css'
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
  publicDir: false,
}))

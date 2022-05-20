import path from 'path'
import { defineConfig } from 'vite'
import { vite2Ext } from 'apite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import styleImport, { VantResolve } from 'vite-plugin-style-import'

export default defineConfig({
  base: './',
  root: 'src',
  publicDir: resolve('public'),
  build: {
    assetsDir: 'static',
    outDir: resolve('dist'),
    emptyOutDir: true,
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: "import { h } from 'vue';",
  },
  server: {
    port: 9100,
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@css': resolve('src/asset/css'),
      '@image': resolve('src/asset/image'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // mock
    vite2Ext({
      prefix: '/api',
      dir: 'mock',
    }),
    // styleImport
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@css/var";`,
      },
    },
  },
})

function resolve(...dir) {
  return path.resolve(__dirname, ...dir)
}

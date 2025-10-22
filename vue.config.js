// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 可选：如果你用到了 devtools，就保留导入；没用则删掉
// import vueDevTools from 'vite-plugin-vue-devtools'

const isProdOnPages = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 部署到 GitHub Pages 的“项目站点”时必须设置 base 为 /<仓库名>/
  base: isProdOnPages ? '/zzha-library/' : '/',
})

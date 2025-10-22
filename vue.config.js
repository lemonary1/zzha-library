// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

const REPO = 'zzha-library' // ← 换成你的仓库名

export default ({ command }) =>
  defineConfig({
    plugins: [
      vue(),
      // vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    // dev 时用 '/'，build（部署到 GitHub Pages）时用 '/<repo>/'
    base: command === 'build' ? `/${REPO}/` : '/',
  })

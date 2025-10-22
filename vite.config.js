import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// REPO 名按你的仓库：zzha-library
const REPO = 'zzha-library'

// 用函数形式拿到 command（'serve' | 'build'）
export default ({ command }) =>
  defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    // 本地 dev 用 '/'；build（部署到 GH Pages）用 '/<repo>/'
    base: command === 'build' ? `/${REPO}/` : '/',
  })

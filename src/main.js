import { createApp } from 'vue'
import App from './App.vue'

/* 你可以保留 Bootstrap，如果已经在用的话 */
import 'bootstrap/dist/css/bootstrap.min.css'

/* PrimeVue v4：配置 + 主题 */
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura, // 使用 Aura 主题
    options: {
      // darkModeSelector: 'system'  // 可选：跟随系统深浅色
    },
  },
})

app.mount('#app')

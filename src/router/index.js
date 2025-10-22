import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../components/views/HomeView.vue'
import AboutView from '../components/views/AboutView.vue'
import AddBookView from '../components/views/AddBookView.vue'
import FirebaseRegisterView from '../components/views/FirebaseRegisterView.vue'
import FirebaseSigninView from '../components/views/FirebaseSigninView.vue'
import GetBookCountView from '../components/views/GetBookCountView.vue'
import LoginView from '../components/views/LoginView.vue'
import WeatherView from '../components/views/WeatherView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/add-book', name: 'add-book', component: AddBookView },
  { path: '/register', name: 'register', component: FirebaseRegisterView },
  { path: '/signin', name: 'signin', component: FirebaseSigninView },
  { path: '/get-book-count', name: 'get-book-count', component: GetBookCountView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/weather', name: 'weather', component: WeatherView },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

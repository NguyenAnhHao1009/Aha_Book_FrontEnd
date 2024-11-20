import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@popperjs/core'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './style.main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'

import store from './store'

const token = localStorage.getItem('token')
if (token) {
  store.commit('setToken', token)
}
createApp(App).use(router).use(store).mount('#app')

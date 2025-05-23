import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

import App from './App.vue'
import router from './router'

const app = createApp(App)
gsap.registerPlugin(MorphSVGPlugin)

app.use(createPinia())
app.use(PrimeVue, { unstyled: true })
app.use(router)

app.mount('#app')

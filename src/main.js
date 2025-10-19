import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Checkout from './components/Checkout.vue'
import Shop from './components/Shop.vue'
const router= createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component:Shop},
        {path: '/Checkout', component:Checkout}
    ]
})
createApp(App).use(router).mount('#app')

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Checkout from './components/Checkout.vue'
import Shop from './components/Shop.vue'
import CheckoutConfirm from './components/CheckoutConfirm.vue'
const router= createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component:Shop},
        {path: '/Checkout', component:Checkout},
        {path: '/Checkout/:confirmation', component:CheckoutConfirm, props: true}
    ]
})
createApp(App).use(router).mount('#app')

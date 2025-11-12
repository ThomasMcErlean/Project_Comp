import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import Checkout from './components/Checkout.vue'
import Shop from './components/Shop.vue'
import CheckoutConfirm from './components/CheckoutConfirm.vue'
import PhoneInput from './components/PhoneInput.vue';
const router= createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component:Shop},
        {path: '/Checkout', component:Checkout},
        {path: '/Checkout/:confirmation', component:CheckoutConfirm, props: true}
    ]
})
const app=createApp(App)
app.component('PhoneInput', PhoneInput)
app.use(router).mount('#app')

import { createApp } from 'vue'
import { createRouter, createWebHistory, useRoute } from 'vue-router'
import App from './App.vue'
import Checkout from './components/Checkout.vue'
import Shop from './components/Shop.vue'
import CheckoutConfirm from './components/CheckoutConfirm.vue'
import PhoneInput from './components/PhoneInput.vue';
import Basket from './components/Basket.vue'
import VueGoogleMaps from  '@fawmi/vue-google-maps';
const router= createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component:Shop},
        {path: '/Checkout', component:Checkout},
        {path: '/Checkout/:confirmation/:orderId/:name', component:CheckoutConfirm, props: true},
        {path: '/Basket', component:Basket, props:true}
    ]
})
const route=useRoute();
const app=createApp(App);
app.component('PhoneInput', PhoneInput)
app.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyAkz1lynIspr5dfZUyI8J4HwLnOPRzQuIQ",
      libraries: "places"
    }
  })
app.use(router).mount('#app')

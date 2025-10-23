<!--Vue JS Code-->

<script>
export default {
  data() {
    return {
      basket_App: [],
    }
  },
  methods: {
    update_Basket_Data(basket_From_Shop) {
      console.log("Basket from component"+basket_From_Shop);
      console.log("Basket:"+this.basket_App)
      this.basket_App=basket_From_Shop;
    }
  }
}
</script>
<template>
  <RouterView :key="$route.path" @toggle-basket="update_Basket_Data" :basket_Data="basket_App" >
  </RouterView>
</template>

<!--Vue JS Code-->

<script>
export default {
  data() {
    return {
      basket_App: [],
      src:"https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js",
      test:""
    }
  },
  methods: {
    update_Basket_Data(basket_From_Shop) {
      console.log("Basket from component"+basket_From_Shop);
      console.log("Basket:"+this.basket_App)
      this.basket_App=basket_From_Shop;
    },
    setPlace(event) {
      console.log(event);
      this.test=event.geometry.location;
      console.log(this.test.lat())
    }
  },
  mounted(){
  }

}
</script>
<template>
  <RouterView :key="$route.path" @toggle-basket="update_Basket_Data" :basket_Data="basket_App" >
  </RouterView>
</template>

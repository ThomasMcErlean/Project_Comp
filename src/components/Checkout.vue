<script>

export default {
  props: ["basket_Data"],
  data() {
    return {
      basket_Checkout: this.basket_Data
    }
  }
};

</script>
<template>
  <div class="containter">
    <div class="row">
      <h1>Checkout</h1>
      <p>To complete checkout you must enter a name and a valid phone number</p>
      <div class="col-xs-4">
        <label for="name_Input" class="form-label">Name</label>
        <input id="name_Input" type="text"></input>
      </div>
      <div class="col-xs-4">
        <label for="phone_Input" class="form-label">Phone Number</label>
        <input id="phone_Input" type="tel"></input>
      </div>
      <h2>Basket</h2>
      <div v-if="basket_Checkout.length > 0" v-for="lesson in basket_Checkout" class="col">
      <div class="card">
        <h3 class="card-title">{{ lesson.Subject }}</h3>
        <div class="card-body">
          <p class="card-text">Location: {{ lesson.Location }}</p>
          <p class="card-text">Price: £{{ lesson.Price }}</p>
          <p class="card-text">Available Spaces:{{ lesson.Spaces }}</p>
          <button class="btn btn-danger" @click="remove_From_Basket(lesson.id)">Remove</button>
        </div>
      </div>
      </div>
      <div v-else>
        <p>
          <em>Basket is empty</em>
        </p>
      </div>
      <button class="btn btn-primary" @click="">Checkout</button>
    </div>
  </div>
</template>
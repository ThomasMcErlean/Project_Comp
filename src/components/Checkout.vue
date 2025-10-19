<script>

export default {
  data() {
    return {
      basket:[]
    }
  }
};

</script>
<template>
    <h1>Checkout</h1>
    <input type="text"></input>
    <input type="tel"></input>
    <div v-for="lesson in basket" class="card">
        <h3 class="card-title">{{ lesson.Subject }}</h3>
        <div class="card-body">
            <p class="card-text">Location: {{ lesson.Location }}</p>
            <p class="card-text">Price: £{{ lesson.Price }}</p>
            <p class="card-text">Available Spaces:{{ lesson.Spaces }}</p>
            <button class="btn btn-danger" @click="remove_From_Basket(lesson.id)">Remove</button>
        </div>
    <button class="btn btn-primary" @click="">Checkout</button>
    </div>
</template>
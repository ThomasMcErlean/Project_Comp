<script>

export default {
  props: ["basket_Data"],
  data() {
    return {
      basket_Checkout: this.basket_Data,
      name: "",
      phone_Number: "",
      input_Error: false
    }
  },
  methods: {
    //Tests a given string name with a regex that makes sure its only containing numbers after removing whitespace from the code
    //it returns either true or false if the regex test is passed or failed
    name_Validation(name) {
      name = name.replace(/\s{2,}/g, "");
      const name_Regex = /^\p{L}+$/;
      let name_Regex_Match = name.match(name_Regex);
      return name_Regex_Match;
    },
    //Tests a given string phone number with a regex to match UK phone numbers
    //it returns either true or false if the regex test is passed or failed
    phone_Validation(phone_Number) {
      phone_Number = phone_Number.replace(/\s{2,}/g, "");
      const phone_Regex = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
      phone_Regex_Match = phone_Number.match(phone_Regex);
      return phone_Regex_Match;
    },
    checkout_Test(checkout_Name, checkout_Phone_Number) {
      if (this.name_Validation(checkout_Name) && this.phone_Number(checkout_Phone_Number)) {
        this.$router.push('/Checkout/Success');
      } else {
        $('#ErrorModal').modal('toggle');
      }
    },
    Test() {
      $('#ErrorModal').modal('toggle');
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
        <input id="name_Input" type="text" v-model="name"></input>
        <p v-if="input_Error===true">Please enter a valid name.</p>
      </div>
      <div class="col-xs-4">
        <label for="phone_Input" class="form-label">Phone Number</label>
        <input id="phone_Input" type="tel" v-model="phone_Numbers"></input>
        <p v-if="input_Error===true">Please enter a valid name.</p>
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
      <div class="col-xs-4">
        <button type="button" class="btn btn-primary" @click="Test">Checkout</button>
      </div>
    </div>
  </div>
  <!-- Error modal for invalid name and phone inputs -->
  <div class="modal fade" id="ErrorModal" tabindex="-1" aria-labelledby="ErrorModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content text-danger">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="ErrorModalLabel">Error</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>Please enter a valid name and/or phone number to finish checkout.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
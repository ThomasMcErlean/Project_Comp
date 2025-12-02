<script>
import "intl-tel-input/styles";
export default {
  props: ["basket_Data"],
  data() {
    return {
      basket_Checkout: this.basket_Data,
      name: "",
      phone_Number: "",
      input_Error: false,
      checkout_Response: {}
    }
  },
  methods: {
    /*Tests a given string name with a regex that makes sure its only containing numbers after removing whitespace from the code
    it returns either true or false if the regex test is passed or failed*/
    name_Validation(name) {
      name = name.replace(/\s/g, "X");
      console.log(name);
      const name_Regex = /^[a-z]+$/i;
      let name_Regex_Match = name_Regex.test(name);
      console.log(name_Regex_Match);
      return name_Regex_Match;
    },
    /*Tests a given string phone number with a regex to match UK phone numbers
    it returns either true or false if the regex test is passed or failed*/
    phone_Validation(phone_Number) {
      phone_Number = phone_Number.replace(/\s/g, "0");
      const phone_Regex = /(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?/;
      let phone_Regex_Match = phone_Regex.test(phone_Number);
      return phone_Regex_Match;
    },
    //Validates checkout inputs and that checkout has successfully been done
    checkout_Test(checkout_Name, checkout_Phone_Number) {
      /*Calls name validation and phone validation functions which test the name and phone number inputs to regular expressions
      return either true or false and this'll make the input error false if its true and then change page to checkout confirm success*/
      if (this.name_Validation(checkout_Name) && this.phone_Validation(checkout_Phone_Number)) {
        this.input_Error = false;
        //this.$router.push('/Checkout/Success');
        /*if validation fails input error is changed to true displaying error messages under the text boxes and displaying the error
        modal*/
        return true;
      } else {
        this.input_Error = true;
        $('#ErrorModal').modal('toggle');
        return false;
      }
    },
    test(phone_Input) {
      this.phone_Number = phone_Input;
    },
    async space_Update(space_Basket){
      for (let i = 0; i < space_Basket.length; i++) {
        const request_Options={
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({_id:space_Basket[i]._id, Spaces:space_Basket[i].Spaces})
          }
          const response= await fetch("https://project-comp-express-middleware.onrender.com/lessons", request_Options);
      }
    },
    async checkout(basket, checkout_Name, checkout_Phone) {
      const order={name: checkout_Name, phone:checkout_Phone, basket:basket};
      console.log(order);
      try {
        if (this.checkout_Test(checkout_Name, checkout_Phone)) {
          this.space_Update(basket);
          const request_Options={
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(order)
          }
          const response=await fetch("https://project-comp-express-middleware.onrender.com/orders", request_Options).then(response => response.json()).then(response => this.$router.push('/Checkout/Success/'+response+'/'+checkout_Phone))
          this.input_Error = false;
        }
      } catch (error) {
      }
    }
  }
};
</script>
<template>
  <div class="container">
    <div class="row">
      <p>{{ this.phone_Number }}</p>
      <!--Button to link to shopping page-->
      <div class="col-xs-4">
        <button class="btn btn-primary my-3" @click="this.$router.push('/')">Go back to shopping page</button>
      </div>
      <div class="col">
        <h1>Checkout</h1>
        <p>To complete checkout you must enter a name and a valid phone number</p>
        <!--Name input section-->
        <div class="col-xs-4">
          <label for="name_Input" class="form-label">Name</label>
          <input id="name_Input" type="text" v-model="name"></input>
          <!--When the checkout function is called this text will appear if the name inputted doesn't pass the regex check function-->
          <p class="text-danger" v-if="input_Error === true">Please enter a valid name.</p>
        </div>
        <!--Phone input section-->
        <PhoneInput id="phone" @toggle-phone-input="test"></PhoneInput>
        <!--When the checkout function is called this text will appear if the phone number inputted doesn't pass the regex check function-->
        <p class="text-danger" v-if="input_Error === true">Please enter a valid phone number.</p>
        <h2>Basket</h2>
        <!--Displays users basket if there any items in the basket.-->
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
        <!--If the checkout is empty it'll display the Basket is empty text.-->
        <div v-else>
          <p>
            <em>Basket is empty</em>
          </p>
        </div>
        <!--Button to call the checkout function and validate checkout before sending the user to checkout confirm page.-->
        <div class="col-xs-4">
          <button type="button" class="btn btn-primary" @click="checkout(basket_Checkout, name, phone_Number)">Checkout</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Error modal for invalid name and phone inputs -->
  <div class="modal fade" id="ErrorModal" tabindex="-1" aria-labelledby="ErrorModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content text-danger">
        <!--Modal Title-->
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="ErrorModalLabel">Error</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!--Modal Body-->
        <div class="modal-body">
          <p>Please enter a valid name and/or phone number to finish checkout.</p>
        </div>
        <!--Modal footer-->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
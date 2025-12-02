<script>
export default {
    props: ["basket_Data"],
    data() {
        return {
            basket_Basket: this.basket_Data
        }
    },
    methods: {
        //Returns the sum of all the prices in the basket array
        basket_Sum() {
            let sum = 0;
            for (let i = 0; i < this.basket_Basket.length; i++) {
                const lesson = this.basket_Basket[i];
                const price = lesson.Price;
                sum = sum + price;
            }
            return sum;
        },
        //Removes a lesson from the basket list
        remove_From_Basket(lesson_Id) {
            if (this.basket_Basket[lesson_Id].Quantity === 1) {
                this.basket_Basket.splice(lesson_Id, 1);
            } else {
                let Basket_Item = this.basket_Basket[lesson_Id];
                Object.defineProperty(Basket_Item, "Price", { value: this.basket_Basket[lesson_Id].Price - (this.basket_Basket[lesson_Id].Price / this.basket_Basket[lesson_Id].Quantity) });
                Object.defineProperty(Basket_Item, "Quantity", { value: this.basket_Basket[lesson_Id].Quantity - 1 });
                this.$forceUpdate();
            }
        },
        //Updates App.vues basket array and sends user to checkout page
        send_To_Checkout() {
            this.$emit("toggle-basket", this.basket_Basket);
            this.$router.push("/Checkout");
        },
        //Updates App.vues basket array and sends user to shop page
        send_To_Shop() {
            this.$emit("toggle-basket", this.basket_Basket);
            this.$router.push("/");
        },
    }
}
//(lesson.Quantity + 1) - i
</script>

<template>
    <div class="container">
        <div class="col-xs-4">
            <button class="btn btn-primary my-3" @click="send_To_Shop">Go back to shopping page</button>
        </div>
        <div class="row">
            <div class="col-sm-8">
                <h1>Basket</h1>
                <div class="card">
                    <div v-if="this.basket_Basket.length === 0" class="card-body">Basket is empty.</div>
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(lesson, index) in basket_Basket">
                            {{ lesson.Subject }}
                            £{{ lesson.Price }}
                            x{{ lesson.Quantity }}
                            <button class="btn btn-danger" @click="remove_From_Basket(index)">Remove</button>

                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-4">
                <h1>Summary</h1>
                <div class="card">
                    <div class="card-body">
                        <p>Subtotal: £{{ basket_Sum() }}</p>
                        <button v-if="this.basket_Basket.length !== 0" class="btn btn-secondary" type="button" @click="send_To_Checkout">Checkout</button>
                        <button v-else class="btn btn-danger" disabled>Out of spaces</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
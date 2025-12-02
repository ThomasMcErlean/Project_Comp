<script>
export default {
    props: ["basket_Data"],
    data() {
        return {
            basket_Basket: this.basket_Data
        }
    },
    methods: {
        basket_Sum() {
            let sum = 0;
            for (let i = 0; i < this.basket_Basket.length; i++) {
                const lesson = this.basket_Basket[i];
                const price = lesson.Price;
                sum = sum + price;
            }
            return sum;
        },
        remove_From_Basket(lesson_Id) {
            if (this.basket_Basket[lesson_Id].Quantity === 1) {
                this.basket_Basket.splice(lesson_Id, 1);
            } else {
                let Basket_Item = this.basket_Basket[lesson_Id];
                Object.defineProperty(Basket_Item, "Quantity", { value: this.basket_Basket[lesson_Id].Quantity - 1 });
                this.$forceUpdate();
            }
        },
    }
}
//(lesson.Quantity + 1) - i
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <h1>Basket</h1>
                <div class="card">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="(lesson, index) in basket_Basket">
                            {{ lesson.Subject }}
                            £{{ lesson.Price }}
                            <select name="Quantity" id="Quantity">
                                <option v-for="n in lesson.Quantity" :value="(lesson.Quantity + 1) - n">
                                    {{ (lesson.Quantity + 1) - n }}</option>
                            </select>
                            <button class="btn btn-danger" @click="remove_From_Basket(index)">Remove</button>

                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <h1>Summary</h1>
                        <p>£{{ basket_Sum() }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
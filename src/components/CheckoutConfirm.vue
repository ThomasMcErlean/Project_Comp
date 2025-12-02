<script>
export default {
    props: {
        confirmation: String,
        orderId: String,
        name: String
    },
    data() {
        return {
            order_Id: this.orderId,
            order_Name: this.name,
        }
    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <h1>Checkout</h1>
            <div class="col-6 text-center y-3">
                <div v-if="confirmation === 'Success'" class="border border-success border-3">
                    <h3>Order <em>#{{orderId}}</em> confirmed</h3>
                    <p class="fs-1 text-success">✓</p>
                    <p>Order confirmed for {{ order_Name }}</p>
                </div>
                <div class="border border-danger border-3" v-else>
                    <h1 class="text-danger">Checkout unsuccessful</h1>
                    <img class="rounded-circle"></img>
                    <p class="fs-1 text-danger">✗</p>
                    <p class="text-danger">Order failed.</p>
                </div>
                <div class="col-xs-4">
                    <button class="btn btn-primary my-3" @click="this.$router.push('/')">Go back to shopping
                        page</button>
                </div>
            </div>
        </div>
    </div>
</template>
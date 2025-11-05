<script>
export default {
    props: {
        confirmation: String
    },
    data() {
        return {
        }
    }
}
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-4">
                <button class="btn btn-primary my-3" @click="this.$router.push('/')">Go back to shopping page</button>
            </div>
            <div class="col-4 text-center y-3">
                <div v-if="confirmation === 'Success'" class="border border-success border-3">
                    <h1 class="text-success">Checkout Success</h1>
                    <img class="rounded-circle"></img>
                    <p class="fs-1 text-success">✓</p>
                    <p class="text-success">Order confirmed.</p>
                </div>
                <div class="border border-danger border-3" v-else>
                    <h1 class="text-danger">Checkout unsuccessful</h1>
                    <img class="rounded-circle"></img>
                    <p class="fs-1 text-danger">✗</p>
                    <p class="text-danger">Order failed.</p>
                </div>
            </div>
        </div>
    </div>
</template>
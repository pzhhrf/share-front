<template>
    <div>
        <MyHeader></MyHeader>
        <section class="bg-half-pay bg-primary">
            <div class="bg-overlay"></div>
            <b-container>
                <b-row>
                    <b-col sm="9">
                        <b-form-input
                            v-model="code"
                            placeholder="input your redeem code"
                            size="lg"
                        >
                        </b-form-input>
                    </b-col>
                    <b-col align-self="center">
                        <b-button variant="primary">Recharge</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <Foot></Foot>
    </div>
</template>
<script>
import MyHeader from "./child/MyHeader.vue";
import Foot from "./child/Foot.vue";
export default {
    name: "Task",
    components: { MyHeader, Foot },
    data() {
        return {
            code: null,
        };
    },
};
</script>
<style>
.bg-half-pay {
    padding: 300px 0;
    background-size: cover;
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    align-self: center;
    position: relative;
    background-position: center center;
}
</style>
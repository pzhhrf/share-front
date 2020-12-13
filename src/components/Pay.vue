<template>
    <div>
        <MyHeader></MyHeader>
        <section class="bg-half-260 bg-primary">
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
                    <b-col col sm="2" align-self="center">
                        <b-overlay
                            :show="chargeLoading"
                            rounded
                            opacity="0.6"
                            spinner-small
                            spinner-variant="primary"
                        >
                            <b-button
                                block
                                variant="primary"
                                @click="activeRedeem"
                            >
                                Recharge</b-button
                            >
                        </b-overlay>
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
import request from "@/api/req.js";
export default {
    name: "Task",
    components: { MyHeader, Foot },
    data() {
        return {
            code: null,
            chargeLoading: false,
        };
    },
    methods: {
        activeRedeem() {
            if (this.code == null || this.code == "") {
                this.$message.error(this.$t("pay.code"));
                return;
            }
            this.chargeLoading = true;
            var dict = { code: this.code };
            request
                .addRedeem(dict)
                .then((res) => {
                    this.chargeLoading = false;
                    if (res.code == 0) {
                        this.$message.success(this.$t("pay.success"));
                        this.$router.push({ path: "/task" });
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    this.chargeLoading = false;
                    this.$message.error(this.$t("network.error"));
                });
        },
    },
};
</script>
<style>
</style>
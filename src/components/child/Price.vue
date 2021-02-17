<template>
    <div class="col-lg-3 col-md-6 col-12 mt-4 pt-2">
        <div v-bind:class="isRem">
            <div v-if="recommend">
                <div class="lable text-center bg-primary pt-2 pb-2">
                    <p
                        class="best small font-weight-bold text-white mb-0 text-uppercase"
                    >
                        Best
                    </p>
                </div>
            </div>
            <div class="plan-name p-4 border-bottom">
                <h4 class="title mb-3">
                    {{ title }}
                </h4>
            </div>
        </div>
        <div class="card-body p-4 price-light">
            <div class="d-flex mb-3">
                <span class="price text-primary h1 mb-0">{{ price }}</span>
            </div>
            <ul class="feature-list list-unstyled mb-0">
                <li class="text-muted">
                    <i class="mdi mdi-arrow-right text-primary mr-2"></i
                    ><span class="font-weight-bold">{{ bandwidth }}</span>
                    {{ $t("home.price.bandwidth") }}
                </li>
                <li class="text-muted">
                    <i class="mdi mdi-arrow-right text-primary mr-2"></i
                    ><span class="font-weight-bold">{{
                        $t("home.price.unlimited")
                    }}</span>
                    {{ $t("home.price.deadline") }}
                </li>
                <li class="text-muted">
                    <i class="mdi mdi-arrow-right text-primary mr-2"></i
                    ><span class="font-weight-bold">{{
                        $t("home.price.day")
                    }}</span>
                    {{ $t("home.price.expired") }}
                </li>
            </ul>
            <b-overlay :show="show" rounded="sm">
                <b-button class="btn btn-primary mt-4" @click="reqPay">{{
                    $t("home.price.start")
                }}</b-button>
            </b-overlay>
        </div>
    </div>
</template>
<script>
import request from "@/api/req.js";
import { bus } from "@/utils/bus.js";
export default {
    name: "HomePrice",
    props: ["title", "price", "bandwidth", "recommend", "id"],
    computed: {
        isRem: function () {
            return this.recommend
                ? "card pricing hosting-rate best-plan border-0 rounded overflow-hidden"
                : "card pricing hosting-rate border-0 rounded overflow-hidden";
        },
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        reqPay() {
            this.show = true;
            let data = { id: this.id };
            request
                .createPay(data)
                .then((res) => {
                    this.show = false;
                    if (res.code == 0) {
                        window.open(res.data.url, "_blank");
                    }
                    if (res.code == 200002) {
                        this.$message.error(this.$t("login.session.out"));
                        bus.$emit("openLogin", true);
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    this.show = false;
                });
        },
    },
};
</script>

<style>
.mdi:before,
.mdi-set {
    display: inline-block;
    font: normal normal normal 24px/1 "Material Design Icons";
    font-size: inherit;
    text-rendering: auto;
    line-height: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.mdi-arrow-right:before {
    content: ">";
}

.price-light {
    background-color: #ffffff;
}
</style>
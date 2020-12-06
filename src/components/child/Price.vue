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
        <div class="card-body p-4">
            <div class="d-flex mb-3">
                <span class="price text-primary h1 mb-0">{{ price }}</span>
            </div>
            <ul class="feature-list list-unstyled mb-0">
                <li class="text-muted">
                    <i class="mdi mdi-arrow-right text-primary mr-2"></i
                    ><span class="font-weight-bold">{{ bandwith }}</span>
                    Bandwith
                </li>
                <li class="text-muted">
                    <i class="mdi mdi-arrow-right text-primary mr-2"></i
                    ><span class="font-weight-bold">Unlimited</span>
                    Bandwith Dealline
                </li>
                <li class="text-muted">
                    <i class="mdi mdi-arrow-right text-primary mr-2"></i
                    ><span class="font-weight-bold">3 Day</span>
                    Expire Storage
                </li>
            </ul>
            <a href="javascript:void(0)" class="btn btn-primary mt-4">{{
                $t("home.price.start")
            }}</a>
        </div>
    </div>
</template>
<script>
export default {
    name: "HomePrice",
    props: ["title", "price", "bandwith", "recommend"],
    computed: {
        isRem: function () {
            return this.recommend
                ? "card pricing hosting-rate best-plan border-0 rounded overflow-hidden"
                : "card pricing hosting-rate border-0 rounded overflow-hidden";
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
</style>
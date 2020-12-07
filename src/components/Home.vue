<template>
    <div>
        <my-header></my-header>
        <!-- Home Start -->
        <section class="bg-half-260 d-table w-100 bg-primary sec-bg">
            <div class="bg-overlay"></div>
            <div class="container">
                <div class="row mt-5 justify-content-center">
                    <div class="col-12">
                        <div class="title-heading text-center">
                            <h4 class="heading text-white mb-3">
                                {{ $t("home.title") }}
                            </h4>
                            <p class="text-white-50 para-desc mx-auto mb-0">
                                {{ $t("home.desc") }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Service -->
        <section class="section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="section-title text-center mb-4 pb-2">
                            <h4 class="title mb-3">Hosting Services</h4>
                            <p class="text-muted para-desc mx-auto mb-0">
                                Create, collaborate, and turn your ideas into
                                incredible products with the definitive platform
                                for digital design.
                            </p>
                        </div>
                    </div>
                    <!--end col-->
                </div>
                <div class="row">
                    <home-intro
                        :title="$t('home.intro.1.title')"
                        :image="$t('home.intro.1.image')"
                        :introduce="$t('home.intro.1.introduce')"
                    ></home-intro>
                    <home-intro
                        :title="$t('home.intro.2.title')"
                        :image="$t('home.intro.2.image')"
                        :introduce="$t('home.intro.2.introduce')"
                    ></home-intro>
                    <home-intro
                        :title="$t('home.intro.3.title')"
                        :image="$t('home.intro.3.image')"
                        :introduce="$t('home.intro.3.introduce')"
                    ></home-intro>
                </div>
            </div>
        </section>
        <!-- Price Start -->
        <section class="section bg-light">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="section-title text-center mb-4 pb-2">
                            <h4 class="title mb-3">
                                {{ $t("home.price.title") }}
                            </h4>
                            <p class="text-muted para-desc mx-auto mb-0">
                                {{ $t("home.price.desc") }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <price
                        :title="$t('home.price.1.title')"
                        :price="$t('home.price.1')"
                        :bandwith="$t('home.price.1.bandwith')"
                    ></price>
                    <price
                        :title="$t('home.price.2.title')"
                        :price="$t('home.price.2')"
                        :bandwith="$t('home.price.2.bandwith')"
                    ></price>
                    <price
                        :title="$t('home.price.3.title')"
                        :price="$t('home.price.3')"
                        :recommend="true"
                        :bandwith="$t('home.price.3.bandwith')"
                    ></price>
                    <price
                        :title="$t('home.price.4.title')"
                        :price="$t('home.price.4')"
                        :bandwith="$t('home.price.4.bandwith')"
                    ></price>
                </div>
            </div>
        </section>
        <!--support cloud -->
        <section class="section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="section-title text-center mb-4 pb-2">
                            <h4 class="title mb-3">
                                {{ $t("home.support.cloud") }}
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="spt-li">
                        <template v-for="items in sptData">
                            <div
                                class="line"
                                v-for="item in items"
                                :key="item.id"
                            >
                                <div class="img"><img :src="item.icon" /></div>
                                <div class="title">{{ item.display }}</div>
                                <div class="desc">{{ item.example }}</div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </section>
        <foot></foot>
    </div>
</template>

<script>
import Price from "./child/Price.vue";
import Foot from "./child/Foot.vue";
import MyHeader from "./child/MyHeader.vue";
import HomeIntro from "./child/Intro.vue";

import request from "@/api/req.js";

export default {
    name: "Home",
    components: { Price, Foot, MyHeader, HomeIntro },
    created() {
        this.getClouds();
    },
    data() {
        return {
            sptData: [],
        };
    },
    methods: {
        getClouds() {
            request.getSupportCloud().then((res) => {
                if (res.code == 0) {
                    this.sptData = this.slickArrFn(res.data);
                }
            });
        },
        slickArrFn(array) {
            var result = [];
            var size = 6;
            for (var x = 0; x < Math.ceil(array.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(array.slice(start, end));
            }
            return result;
        },
    },
};
</script>
<style>
.sec-bg {
    background: url(../assets/images/bg1.png) top, center;
}
.spt-li {
    width: 312px;
    height: 380px;
    float: left;
    margin: 0 10px;
    background: #fff;
    border: 1px solid #e2e7f0;
    border-radius: 10px;
    padding-top: 20px;
}
.spt-li .line {
    width: 312px;
    height: 60px;
    position: relative;
}
.spt-li .line .img img {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 30px;
    top: 20px;
}
.spt-li .line .title {
    width: 230px;
    height: 30px;
    line-height: 20px;
    position: absolute;
    left: 72px;
    top: 6px;
    color: #142655;
    font-size: 16px;
}
.spt-li .line .desc {
    width: 230px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    left: 72px;
    top: 30px;
    color: #8992aa;
    font-size: 12px;
}
</style>
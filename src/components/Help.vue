<template>
    <div>
        <MyHeader></MyHeader>
        <section
            class="bg-half-170 d-table w-100 bg-light"
            :style="{ background: 'url(' + pageBg + ') top center' }"
        >
            <b-container>
                <b-row class="mt-5">
                    <b-col lg="12">
                        <div class="title-heading text-center text-md-left">
                            <h3>FAQs</h3>
                            <p class="text-muted para-desc mt-3 mb-0">
                                {{ $t("faq.desc") }}
                            </p>
                            <b-nav
                                aria-label="breadcrumb"
                                class="d-inline-block mt-4"
                            ></b-nav>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <div class="position-relative">
            <div class="shape overflow-hidden text-white">
                <svg
                    viewBox="0 0 1000 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M 0 0 c 0 0 200 50 500 50 s 500 -50 500 -50 v 101 h -1000 v -100 z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>
        </div>
        <section class="session">
            <b-container>
                <b-row>
                    <b-col class="col-lg-4 col-md-5 col-12 d-none d-md-block">
                        <div class="rounded-pill shadow p-4 component-wrapper">
                            <ul class="list-unstyled mb-0">
                                <li class="mb-4">
                                    <a
                                        href="#down"
                                        class="mouse-down h6 text-dark"
                                        >{{ $t("faq.nav.1") }}</a
                                    >
                                </li>
                                <li class="mb-4">
                                    <a
                                        href="#general"
                                        class="mouse-down h6 text-dark"
                                    >
                                        {{ $t("faq.nav.2") }}</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </b-col>
                    <b-col lg="8" md="7" cols="12">
                        <div class="session-title" id="down">
                            <h4>{{ $t("faq.nav.1") }}</h4>
                        </div>

                        <div class="accordion">
                            <HelpList :desc="downDesc"></HelpList>
                        </div>
                        <div class="session-title" id="general">
                            <h4>{{ $t("faq.nav.2") }}</h4>
                        </div>
                        <div class="accordion">
                            <HelpList :desc="generalDesc"></HelpList>
                        </div>
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
import PageBg from "@/assets/images/page.png";
import HelpList from "./child/HelpList.vue";
export default {
    name: "Help",
    components: { MyHeader, Foot, HelpList },
    computed: {},
    data() {
        return {
            pageBg: PageBg,
            downDesc: [
                {
                    title: "Features",
                    id: "down-1",
                    visible: true,
                    desc: ["CentOS 6/CentOS 7/Ubuntu 16.04/Fedora 23/Debian 8"],
                },
            ],
            generalDesc: [
                {
                    title: "General",
                    id: "general-1",
                    visible: true,
                    desc: ["CentOS 6/CentOS 7/Ubuntu 16.04/Fedora 23/Debian 8"],
                },
            ],
        };
    },
};
</script>
<style>
.testx {
    content: "\F415";
}
</style>
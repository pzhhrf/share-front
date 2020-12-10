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
                        <div class="accordion" id="accordionExample">
                            <b-card no-body class="border-0 rounded mb-2">
                                <a
                                    data-toggle="collapse"
                                    v-b-toggle.down-1
                                    class="faq position-relative"
                                >
                                    <b-card-header
                                        class="border-0 bg-light p-3 pr-5"
                                    >
                                        <h6 class="title mb-0">Features</h6>
                                        <span class="mdi mdi-image-edit"></span>
                                    </b-card-header>
                                </a>
                                <b-collapse
                                    id="down-1"
                                    accordion="down-1"
                                    visible
                                >
                                    <b-card-body
                                        id="down-1"
                                        data-parent="#accordionExample"
                                        class="p-4"
                                    >
                                        <ul class="list-unstyled mb-0">
                                            <li class="text-muted my-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    class="feather feather-arrow-right-circle fea icon-ex-md text-primary mr-2"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                    ></circle>
                                                    <polyline
                                                        points="12 16 16 12 12 8"
                                                    ></polyline>
                                                    <line
                                                        x1="8"
                                                        y1="12"
                                                        x2="16"
                                                        y2="12"
                                                    ></line></svg
                                                >CentOS 6/CentOS 7/Ubuntu
                                                16.04/Fedora 23/Debian 8
                                            </li>
                                        </ul>
                                    </b-card-body>
                                </b-collapse>
                            </b-card>
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
export default {
    name: "Help",
    components: { MyHeader, Foot },
    computed: {},
    data() {
        return {
            pageBg: PageBg,
        };
    },
};
</script>
<style>
.testx{
    content: '\F415';
}
</style>
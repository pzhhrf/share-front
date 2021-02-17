<template>
    <header id="topnav" :class="headerLocalCls">
        <b-container>
            <!-- Logo container-->
            <div>
                <a class="logo" href="/">
                    <img
                        src="../../assets/images/logo-dark.png"
                        class="l-dark"
                        height="16"
                        alt=""
                    />
                    <img
                        src="../../assets/images/logo-light.png"
                        class="l-light"
                        height="16"
                        alt=""
                    />
                </a>
            </div>
            <div class="buy-button">
                <template v-if="isLogined">
                    <div>
                        <b-dropdown size="sm" class="bg-light" variant="light">
                            <template #button-content>
                                {{ user.email }}
                                <br />
                                {{ $t("head.band.left") }} {{ left }}
                            </template>
                            <!-- <b-dropdown-item to="/order"
                                >My Order</b-dropdown-item
                            > -->
                            <b-dropdown-item-btn @click="logout"
                                >Log out</b-dropdown-item-btn
                            >
                        </b-dropdown>
                    </div>
                </template>
                <template v-else>
                    <a
                        href="#"
                        class="text-dark h6 mr-3 login"
                        @click="btnShowLogin(true)"
                        >{{ $t("btn.login") }}</a
                    >
                    <a
                        href="#"
                        class="text-dark h6 mr-3 login"
                        @click="btnShowLogin(false)"
                        >{{ $t("btn.register") }}</a
                    >
                </template>
            </div>
            <div class="switch-button">
                <b-dropdown
                    :text="currentLang"
                    class="m-1 switch-lang"
                    variant="light"
                    size="sm"
                >
                    <!-- <b-dropdown-item-btn @click="switchLang('en')"
                        >en</b-dropdown-item-btn
                    > -->
                    <b-dropdown-item-btn @click="switchLang('zh')"
                        >zh</b-dropdown-item-btn
                    >
                </b-dropdown>
            </div>
            <!--end login button-->
            <!-- End Logo container-->
            <div id="navigation" class="active">
                <ul class="navigation-menu nav-light">
                    <li>
                        <router-link :to="{ name: 'Home' }">{{
                            $t("link.home")
                        }}</router-link>
                        <span class="menu-arrow"></span>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Task' }">{{
                            $t("link.task")
                        }}</router-link>
                        <span class="menu-arrow"></span>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Payment' }">{{
                            $t("link.pay")
                        }}</router-link>
                        <span class="menu-arrow"></span>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Help' }">{{
                            $t("link.help")
                        }}</router-link>
                        <span class="menu-arrow"></span>
                    </li>
                </ul>
            </div>
        </b-container>
        <template v-if="showLogin">
            <login @fatherMethod="emitLogin" :isLogin="isLoginPop"></login>
        </template>
    </header>
</template>
<script>
import Login from "./Login.vue";
import { CheckLogin } from "@/utils/validate.js";
import { bus } from "@/utils/bus.js";
import i18n from "../../i18n.js";
import Cookies from "js-cookie";
import request from "@/api/req.js";
import { formatSize } from "@/filter/index.js";
export default {
    name: "MyHeader",
    props: {
        headerCls: { default: "defaultscroll sticky" },
        enableScroll: { default: true },
    },
    components: { Login },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
        var s = Cookies.get("leftBandwidth");
        if (s) {
            this.left = s;
        }
    },
    created() {
        bus.$on("openLogin", () => {
            this.showLogin = true;
        });
        bus.$on("userstatus", () => {
            this.getUserStatus();
        });
        var info = CheckLogin();
        if (info) {
            this.isLogined = true;
            this.user = info;
            this.getUserStatus();
        }
        let lang = Cookies.get("lang");
        if (lang != undefined) {
            this.currentLang = lang;
        }
    },
    computed: {},
    data() {
        return {
            showLogin: false,
            isLoginPop: true,
            isLogined: false,
            langSelected: null,
            currentLang: "zh",
            user: {},
            left: 0,
            headerLocalCls: this.headerCls,
        };
    },
    methods: {
        handleScroll() {
            var scrollTop = window.scrollY;
            if (this.enableScroll) {
                if (scrollTop >= 50) {
                    this.headerLocalCls = "defaultscroll sticky nav-sticky";
                } else {
                    this.headerLocalCls = "defaultscroll sticky";
                }
            }
        },
        btnShowLogin(popReg) {
            this.showLogin = true;
            this.isLoginPop = popReg;
        },
        emitLogin(dict) {
            if (dict.action == "close") {
                this.showLogin = false;
            }
            if (dict.action == "switch") {
                this.isLoginPop = dict.value;
            }
        },
        switchLang(key) {
            i18n.locale = key;
            this.currentLang = key;
            Cookies.set("lang", key);
        },
        logout() {
            Cookies.remove("userinfo");
            this.$router.push({
                path: "/",
            });
        },
        getUserStatus() {
            if (!this.user) {
                return;
            }
            request.getUserStatus().then((res) => {
                if (res.code == 0 && res.data) {
                    this.left = formatSize(res.data.permanent_balance);
                    Cookies.set("leftBandwidth", this.left);
                }
            });
        },
    },
};
</script>
<style >
.switch-lang .dropdown-menu {
    min-width: 5rem;
    overflow-y: auto;
}
.switch-button {
    float: right;
    line-height: 50px;
    padding: 10px 10px;
}
</style>
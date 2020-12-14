<template>
    <header id="topnav" :class="headerCls">
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
                        <b-dropdown right text="Lang" class="m-1">
                            <b-dropdown-item>Item 1</b-dropdown-item>
                            <b-dropdown-item>Item 2</b-dropdown-item>
                            <b-dropdown-item>Item 3</b-dropdown-item>
                        </b-dropdown>
                        <span class="menu-arrow"></span>
                        <b-avatar size="3em">Hello<br />World</b-avatar>
                    </div>
                </template>
                <template v-else>
                    <a
                        href="#"
                        class="text-dark h6 mr-3 login"
                        @click="btnShowLogin(true)"
                        >Login</a
                    >
                    <a
                        href="#"
                        class="text-dark h6 mr-3 login"
                        @click="btnShowLogin(false)"
                        >Register</a
                    >
                </template>
            </div>
            <!--end login button-->
            <!-- End Logo container-->
            <div id="navigation">
                <ul class="navigation-menu nav-light">
                    <li>
                        <router-link :to="{ name: 'Home' }">Home</router-link>
                        <span class="menu-arrow"></span>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Task' }">Task</router-link>
                        <span class="menu-arrow"></span>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Payment' }">Pay</router-link>
                        <span class="menu-arrow"></span>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Help' }">Help</router-link>
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
export default {
    name: "MyHeader",
    components: { Login },
    props: [],
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    created() {
        bus.$on("openLogin", (value) => {
            this.showLogin = true;
        });
        var info = CheckLogin();
        if (info) {
            this.isLogined = true;
        }
    },
    computed: {},
    data() {
        return {
            showLogin: false,
            isLoginPop: true,
            isLogined: false,
            headerCls: "defaultscroll sticky",
        };
    },
    methods: {
        handleScroll() {
            var scrollTop = window.scrollY;
            if (scrollTop >= 50) {
                this.headerCls = "defaultscroll sticky nav-sticky";
            } else {
                this.headerCls = "defaultscroll sticky";
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
    },
};
</script>
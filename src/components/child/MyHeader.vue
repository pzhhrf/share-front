<template>
    <header id="topnav" class="defaultscroll sticky">
        <div class="container">
            <!-- Logo container-->
            <div>
                <a class="logo" href="index.html">
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
            </div>
            <!--end login button-->
            <!-- End Logo container-->
            <div id="navigation">
                <ul class="navigation-menu nav-light">
                    <li>
                        <router-link :to="{ name: 'Index' }">Home</router-link>
                        <span class="menu-arrow"></span>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Login' }">Task</router-link>
                        <span class="menu-arrow"></span>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Login' }">Docs</router-link>
                        <span class="menu-arrow"></span>
                    </li>
                    <li>
                        <router-link :to="{ name: 'Login' }"
                            >Contact</router-link
                        >
                        <span class="menu-arrow"></span>
                    </li>
                </ul>
            </div>
        </div>
        <template v-if="showLogin">
            <login @fatherMethod="emitLogin" :isLogin="isLoginPop"></login>
        </template>
    </header>
</template>
<script>
import Login from "./Login.vue";
export default {
    name: "MyHeader",
    components: { Login },
    props: [],
    computed: {},
    data() {
        return {
            showLogin: false,
            isLoginPop: true,
        };
    },
    methods: {
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
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
                <span class="text-dark h6 mr-3 login" @click="btnShowLogin"
                    >Login</span
                >
                <a
                    href="https://1.envato.market/hostick"
                    target="_blank"
                    class="btn btn-primary"
                    >Support</a
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
            <login @fatherMethod="emitLogin"></login>
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
        };
    },
    methods: {
        btnShowLogin() {
            this.showLogin = true;
        },
        emitLogin(dict) {
            if (dict.action == "close") {
                this.showLogin = false;
            }
        },
    },
};
</script>
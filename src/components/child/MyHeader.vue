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
                    data-toggle="modal"
                    data-target="#LoginForm"
                    >Login</a
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
    </header>
</template>
<script>
export default {
    name: "MyHeader",
    props: [],
    computed: {},
};
</script>
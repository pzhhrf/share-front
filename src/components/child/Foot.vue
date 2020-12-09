<template>
    <div>
        <footer class="footer bg-footer">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <div class="section-title text-md-center">
                            <h4 class="text-light mb-0">Get In Touch !</h4>
                        </div>
                    </div>
                </div>
                <div class="row mt-3 justify-content-center">
                    <div class="col-md-4 mt-4 pt-2">
                        <div class="text-md-center">
                            <div class="icon">
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
                                    class="feather feather-mail fea icon-md text-light"
                                >
                                    <path
                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                                    ></path>
                                    <polyline
                                        points="22,6 12,13 2,6"
                                    ></polyline>
                                </svg>
                            </div>
                            <div class="content mt-2">
                                <h5 class="title text-light">Email</h5>
                                <a
                                    href="mailto:contact@example.com"
                                    class="text-foot"
                                    >contact@example.com</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <footer class="footer footer-line bg-footer">
            <div class="container">
                <div class="row text-center">
                    <div class="col-sm-6">
                        <div class="text-sm-center">
                            <p class="mb-0 text-foot">© 2020 Sharecloud.cc</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
export default {
    name: "HomePrice",
    props: { fixed: { type: Boolean, default: true } },
    computed: {
        bindFtCls() {
            if (this.fixed) {
                return "";
            } else {
                return "foot-abs";
            }
        },
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
<style>
.foot-abs {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
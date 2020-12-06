<template>
    <div
        class="modal fade"
        id="LoginForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
    >
        <div
            class="modal-dialog modal-sm modal-dialog-centered"
            role="document"
        >
            <div class="modal-content rounded shadow border-0">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">
                        {{ $t("login.title") }}
                    </h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="login-form">
                        <div class="row">
                            <div class="col-12">
                                <div class="form-group position-relative">
                                    <label
                                        >{{ $t("login.email") }}
                                        <span class="text-danger"
                                            >*</span
                                        ></label
                                    >
                                    <input
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        required=""
                                        :placeholder="$t('login.email')"
                                    />
                                </div>
                            </div>
                            <!--end col-->

                            <div class="col-12">
                                <div class="form-group position-relative">
                                    <label
                                        >{{ $t("login.password") }}
                                        <span class="text-danger"
                                            >*</span
                                        ></label
                                    >
                                    <input
                                        type="password"
                                        class="form-control"
                                        required=""
                                        :placeholder="$t('login.email')"
                                    />
                                </div>
                            </div>
                            <!--end col-->

                            <div class="col-12">
                                <div class="d-flex justify-content-between">
                                    <div class="form-group d-inline-block">
                                        <div
                                            class="custom-control custom-checkbox"
                                        >
                                            <input
                                                type="checkbox"
                                                class="custom-control-input"
                                                id="customCheck1"
                                            />
                                            <label
                                                class="custom-control-label"
                                                for="customCheck1"
                                                >{{
                                                    $t("login.remember")
                                                }}</label
                                            >
                                        </div>
                                    </div>
                                    <p class="forgot-pass mb-0">
                                        <a
                                            href="page-forgot-password.html"
                                            class="text-dark font-weight-bold"
                                            >Forgot password ?</a
                                        >
                                    </p>
                                </div>
                            </div>
                            <!--end col-->
                            <div class="col-12 mb-0">
                                <button class="btn btn-primary w-100">
                                    {{ $t("login.signin") }}
                                </button>
                            </div>
                            <!--end col-->
                            <div class="col-12 text-center">
                                <p class="mb-0 mt-3">
                                    <small class="text-dark mr-2"
                                        >Don't have an account ?</small
                                    >
                                    <a
                                        href="page-signup.html"
                                        class="text-dark font-weight-bold"
                                        >{{ $t("login.signup") }}</a
                                    >
                                </p>
                            </div>
                            <!--end col-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Login",
    data() {
        return {};
    },
    methods: {},
};
</script>
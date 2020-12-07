<template>
    <div class="modal-dialog">
        <div class="modal-content rounded shadow border-0">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">
                    {{ $t("login.title") }}
                </h5>
                <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    @click="close()"
                >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                    <b-form
                        @submit.stop.prevent="handleSubmit(onLoginSubmit)"
                        @reset="onLoginReset"
                        ref="loginForm"
                    >
                        <validation-provider
                            name="Email"
                            rules="required|email"
                            v-slot="{ errors }"
                        >
                            <b-form-group
                                :label="$t('login.email')"
                                label-cols="12"
                            >
                                <b-form-input
                                    type="email"
                                    required
                                    :placeholder="$t('login.email')"
                                    v-model="loginForm.email"
                                    trim
                                ></b-form-input>
                                <b-form-invalid-feedback
                                    class="invalid-feedback d-block"
                                    >{{ errors[0] }}</b-form-invalid-feedback
                                >
                            </b-form-group>
                        </validation-provider>
                        <b-form-group
                            :label="$t('login.password')"
                            label-cols="12"
                            :state="state"
                            :invalid-feedback="invalidPwdFeedback"
                        >
                            <b-form-input
                                required
                                type="password"
                                :placeholder="$t('login.password')"
                                v-model="loginForm.password"
                                maxlength="20"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-row>
                            <b-col>
                                <b-form-checkbox
                                    v-model="loginForm.remember"
                                    value="true"
                                    unchecked-value="false"
                                    class="text-dark font-weight-bold"
                                >
                                    Remember me
                                </b-form-checkbox>
                            </b-col>
                            <b-col>
                                <div class="forgot-pass float-right">
                                    <a
                                        href="page-forgot-password.html"
                                        class="text-dark font-weight-bold"
                                        >Forgot password ?</a
                                    >
                                </div>
                            </b-col>
                        </b-form-row>

                        <b-form-group label-cols="12">
                            <button class="btn btn-primary w-100">
                                {{ $t("login.signin") }}
                            </button>
                        </b-form-group>
                        <div class="col-12 text-center">
                            <p class="mb-0 mt-3">
                                <small class="text-dark mr-2"
                                    >Don't have an account ?</small
                                >
                                <a
                                    href="page-signup.html"
                                    class="text-dark font-weight-bold"
                                    >Sign Up</a
                                >
                            </p>
                        </div>
                    </b-form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Login",
    props: ["showLogin"],
    data() {
        return {
            loginForm: {
                email: "",
                password: "",
                remember: "",
            },
        };
    },
    computed: {
        state() {
            return this.loginForm.password.length >= 8;
        },
        invalidPwdFeedback() {
            if (this.loginForm.password.length > 0) {
                return "Enter at least 8 characters.";
            }
            return "Please enter password.";
        },
    },
    methods: {
        onLoginSubmit() {},
        onLoginReset() {},
        close() {
            this.$emit("fatherMethod", { action: "close" });
        },
    },
};
</script>
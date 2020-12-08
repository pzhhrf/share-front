<template>
    <div class="modal-dialog">
        <template v-if="isLogin">
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
                    <ValidationObserver
                        ref="observer_reg"
                        v-slot="{ handleSubmit }"
                    >
                        <b-form
                            @submit.stop.prevent="handleSubmit(onLoginSubmit)"
                            @reset="onRegReset"
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
                                        >{{
                                            errors[0]
                                        }}</b-form-invalid-feedback
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
                                        {{ $t("login.remember") }}
                                    </b-form-checkbox>
                                </b-col>
                                <b-col>
                                    <div class="forgot-pass float-right">
                                        <a
                                            href="page-forgot-password.html"
                                            class="text-dark font-weight-bold"
                                            >{{ $t("login.forget") }}</a
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
                                        href="#"
                                        class="text-dark font-weight-bold"
                                        @click="switchReg(true)"
                                        >Sign Up</a
                                    >
                                </p>
                            </div>
                        </b-form>
                    </ValidationObserver>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="modal-content rounded shadow border-0">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">
                        {{ $t("reg.title") }}
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
                    <ValidationObserver
                        ref="observer"
                        v-slot="{ handleSubmit }"
                    >
                        <b-form
                            @submit.stop.prevent="
                                handleSubmit(onRegisterSubmit)
                            "
                            @reset="onLoginReset"
                            ref="regForm"
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
                                        v-model="regForm.email"
                                        trim
                                    ></b-form-input>
                                    <b-form-invalid-feedback
                                        class="invalid-feedback d-block"
                                        >{{
                                            errors[0]
                                        }}</b-form-invalid-feedback
                                    >
                                </b-form-group>
                                <b-form-group
                                    :label="$t('reg.captcha')"
                                    label-cols="12"
                                >
                                    <b-row>
                                        <b-col cols="8">
                                            <b-form-input
                                                required
                                                :placeholder="$t('reg.captcha')"
                                                v-model="regForm.captcha"
                                                trim
                                            ></b-form-input>
                                        </b-col>
                                        <b-col>
                                            <b-button
                                                block
                                                variant="primary"
                                                @click="sendCaptcha"
                                                :disabled="btnCaptchaStatus"
                                                >{{ btnCaptcha }}</b-button
                                            >
                                        </b-col>
                                    </b-row>
                                    <b-form-invalid-feedback
                                        class="invalid-feedback d-block"
                                        >{{
                                            errors[0]
                                        }}</b-form-invalid-feedback
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
                                    v-model="regForm.password"
                                    maxlength="20"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group
                                :label="$t('login.confirm.password')"
                                label-cols="12"
                                :state="state"
                                :invalid-feedback="invalidPwdFeedback"
                            >
                                <b-form-input
                                    required
                                    type="password"
                                    :placeholder="$t('login.password2')"
                                    v-model="regForm.password2"
                                    maxlength="20"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group label-cols="12">
                                <button class="btn btn-primary w-100">
                                    {{ $t("reg.register") }}
                                </button>
                            </b-form-group>
                            <div class="col-12 text-center">
                                <p class="mb-0 mt-3">
                                    <small class="text-dark mr-2"
                                        >You already have an account ?</small
                                    >
                                    <a
                                        href="#"
                                        class="text-dark font-weight-bold"
                                        @click="switchReg(false)"
                                        >Log in</a
                                    >
                                </p>
                            </div>
                        </b-form>
                    </ValidationObserver>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name: "Login",
    props: ["showLogin", "isLogin"],
    data() {
        return {
            loginForm: {
                email: "",
                password: "",
                remember: "",
            },
            regForm: {
                email: "",
                password: "",
                password2: "",
                captcha: "",
            },
            btnCaptcha: "Send",
            btnCaptchaStatus: false,
            timer: null,
            countdown: 60,
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
        onRegisterSubmit() {},
        onRegReset() {},
        sendCaptcha() {
            if (this.regForm.email.trim() == "") {
                this.$message.error("input correct email");
                return;
            }
            if (!this.timer) {
                this.timer = setInterval(() => {
                    if (this.countdown > 0 && this.countdown <= 60) {
                        this.countdown--;
                        if (this.countdown !== 0) {
                            this.btnCaptcha = "Resend(" + this.countdown + ")";
                            this.btnCaptchaStatus = true;
                        } else {
                            clearInterval(this.timer);
                            this.btnCaptcha = "Send";
                            this.countdown = 60;
                            this.timer = null;
                            this.btnCaptchaStatus = false;
                        }
                    }
                }, 1000);
            }
        },
        close() {
            this.$emit("fatherMethod", { action: "close" });
        },
        switchReg(status) {
            this.$emit("fatherMethod", { action: "switch", value: !status });
        },
    },
};
</script>
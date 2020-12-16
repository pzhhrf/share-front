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
                            <b-overlay
                                :show="btnLoginLoading"
                                rounded
                                opacity="0.6"
                                spinner-small
                                spinner-variant="primary"
                            >
                                <b-form-group label-cols="12">
                                    <button class="btn btn-primary w-100">
                                        {{ $t("login.signin") }}
                                    </button>
                                </b-form-group>
                            </b-overlay>
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
                                        <b-overlay
                                            :show="btnCaptchaShow"
                                            rounded
                                            opacity="0.6"
                                            spinner-small
                                            spinner-variant="primary"
                                        >
                                            <b-col>
                                                <b-button
                                                    block
                                                    variant="primary"
                                                    @click="sendCaptcha"
                                                    :disabled="btnCaptchaStatus"
                                                    >{{ btnCaptcha }}</b-button
                                                >
                                            </b-col>
                                        </b-overlay>
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
                            <b-overlay
                                :show="btnRegisterLoading"
                                rounded
                                opacity="0.6"
                                spinner-small
                                spinner-variant="primary"
                            >
                                <b-form-group label-cols="12">
                                    <button class="btn btn-primary w-100">
                                        {{ $t("reg.register") }}
                                    </button>
                                </b-form-group>
                            </b-overlay>
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
import request from "@/api/req.js";
import md5 from "js-md5";
import Cookies from "js-cookie";
import moment from "moment";
import { CheckLogin } from "@/utils/validate.js";
import { bus } from "@/utils/bus.js";
export default {
    name: "Login",
    props: ["showLogin", "isLogin"],
    inject: ["reload"],
    data() {
        return {
            loginForm: {
                email: "test@163.com",
                password: "ppp@12345",
                remember: false,
            },
            regForm: {
                email: "",
                password: "",
                password2: "",
                captcha: "",
            },
            btnCaptcha: "Send",
            btnCaptchaStatus: false,
            btnCaptchaShow: false,
            timer: null,
            countdown: 60,
            btnRegisterLoading: false,
            btnLoginLoading: false,
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
    mounted() {
        var e = Cookies.get("email");
        var p = Cookies.get("password");
        if (e != null && e != undefined) {
            this.loginForm.email = e;
        }
        if (p != null && e != undefined) {
            this.loginForm.password = p;
            this.loginForm.remember = true;
        }
    },
    methods: {
        onLoginSubmit() {
            var dict = {
                email: this.loginForm.email,
                password: md5(this.loginForm.password),
            };
            this.btnLoginLoading = true;
            request
                .postLogin(dict)
                .then((res) => {
                    this.btnLoginLoading = false;
                    if (res.code == 0) {
                        this.setLoginData(res.data);
                        this.close();
                        this.reload();
                        bus.$emit('')
                        this.$router.push({
                            path: "/task",
                        });
                    } else {
                        this.$message.error("email or password error !");
                    }
                })
                .catch((e) => {
                    this.btnLoginLoading = false;
                    console.log(e);
                    this.$message.error(this.$t("network.error"));
                });
        },
        onLoginReset() {
            this.loginForm.email = "";
            this.loginForm.password = "";
        },
        onRegisterSubmit() {
            if (this.regForm.password != this.regForm.password2) {
                this.$message.error(this.$t("reg.pass.not.equal"));
                return;
            }
            var dict = {
                email: this.regForm.email,
                password: this.regForm.password,
                code: this.regForm.captcha,
            };
            this.btnRegisterLoading = true;
            request
                .postReg(dict)
                .then((res) => {
                    this.btnRegisterLoading = false;
                    if (res.code == 0) {
                        this.setLoginData(res.data);
                        this.close();

                        this.$router.push({
                            path: "/task",
                        });
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch((e) => {
                    this.btnRegisterLoading = false;
                    console.log(e);
                    this.$message.error(this.$t("network.error"));
                });
        },
        onRegReset() {
            this.regForm.email = "";
            this.regForm.password = "";
            this.regForm.password2 = "";
        },
        sendCaptcha() {
            var email = this.regForm.email.trim();
            if (email == "") {
                this.$message.error("input correct email");
                return;
            }
            this.btnCaptchaShow = true;
            let dict = {
                type: 1,
                email: email,
            };
            request
                .postSendCode(dict)
                .then((res) => {
                    if (res.code == 0) {
                        if (!this.timer) {
                            this.timer = setInterval(() => {
                                if (
                                    this.countdown > 0 &&
                                    this.countdown <= 60
                                ) {
                                    this.countdown--;
                                    if (this.countdown !== 0) {
                                        this.btnCaptchaShow = false;
                                        this.btnCaptcha =
                                            "Resend(" + this.countdown + ")";
                                        this.btnCaptchaStatus = true;
                                    } else {
                                        this.btnCaptchaShow = false;
                                        clearInterval(this.timer);
                                        this.btnCaptcha = "Send";
                                        this.countdown = 60;
                                        this.timer = null;
                                        this.btnCaptchaStatus = false;
                                    }
                                }
                            }, 1000);
                        }
                    } else {
                        this.btnCaptchaStatus = false;
                        this.$message.error(res.msg);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    this.$message.error(this.$t("network.error"));
                });
        },
        close() {
            this.$emit("fatherMethod", { action: "close" });
        },
        switchReg(status) {
            this.$emit("fatherMethod", { action: "switch", value: !status });
        },
        getUserInfo() {
            request
                .getUserStatus()
                .then((res) => {})
                .catch((e) => {
                    console.log(e);
                    this.$message.error(this.$t("network.error"));
                });
        },
        setLoginData(data) {
            if (this.loginForm.remember) {
                Cookies.set("email", this.loginForm.email);
                Cookies.set("password", this.loginForm.password);
            }
            Cookies.set("userinfo", JSON.stringify(data), {
                expires: new Date(moment.unix(data.expire)),
            });
        },
    },
};
</script>
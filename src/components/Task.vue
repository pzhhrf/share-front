<template>
    <div>
        <MyHeader></MyHeader>
        <section class="bg-half-260 bg-primary">
            <div class="bg-overlay"></div>
            <b-container>
                <b-row>
                    <b-col sm="9">
                        <b-form-textarea
                            v-model="extract_url"
                            :placeholder="place_extract"
                            rows="5"
                            max-rows="5"
                            size="lg"
                        >
                        </b-form-textarea>
                    </b-col>
                    <b-col sm="2" align-self="center">
                        <b-overlay :show="extLoading">
                            <b-button
                                block
                                variant="primary"
                                size="lg"
                                @click="parseUrl"
                                >{{ $t("btn.extract") }}</b-button
                            >
                        </b-overlay>
                    </b-col>
                </b-row>
            </b-container>
        </section>
        <section>
            <b-container>
                <b-table
                    id="extTable"
                    :items="ext_items"
                    :fields="ext_fields"
                    striped
                    bordered
                    hover
                    caption-top
                    show-empty
                    fixed
                >
                    <template #table-caption
                        ><strong
                            >{{ $t("task.extract.list") }}
                        </strong></template
                    >
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </template>
                    <template #cell(size)="data">
                        {{ data.value | formatSize }}
                    </template>
                    <template #cell(status)="data">
                        {{ data.value | formatExtStatus }}
                    </template>
                    <template #cell(op)="data">
                        <b-overlay
                            :show="trsDownStatus(data.item)"
                            rounded
                            opacity="0.6"
                            spinner-small
                            spinner-variant="primary"
                        >
                            <b-button
                                v-if="data.item.status == 1"
                                @click="addTaskDownload(data.item)"
                                >{{ $t("btn.download") }}</b-button
                            >
                        </b-overlay>
                    </template>
                </b-table>
            </b-container>
        </section>
        <section>
            <b-container>
                <b-table
                    id="downTable"
                    :items="down_items"
                    :fields="down_fields"
                    :busy="downBusy"
                    :per-page="10"
                    :current-page="currentPage"
                    striped
                    bordered
                    hover
                    caption-top
                    show-empty
                    fixed
                >
                    <template #table-caption
                        ><strong> {{ $t("task.file.list") }} </strong></template
                    >
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </template>
                    <template #cell(size)="row">
                        {{ row.value | formatSize }}
                    </template>
                    <template #cell(ctime)="row">
                        {{ row.value | filterTime }}
                    </template>
                    <template #cell(expire_time)="row">
                        {{ row.value | filterTime }}
                    </template>
                    <template #cell(status)="row">
                        {{ row.value | filterStatus }}
                    </template>
                    <template #cell(op)="row">
                        <span
                            v-for="tmp in row.item.download_list"
                            :key="tmp.id"
                        >
                            <b-button
                                v-clipboard:copy="tmp.msg"
                                v-clipboard:success="onCopySuc"
                                v-clipboard:error="onCopyErr"
                                >{{ $t("task.down.addr")
                                }}{{ tmp.id }}</b-button
                            >
                        </span>
                        <b-button
                            @click="delDownload(row)"
                            variant="error"
                        ></b-button>
                    </template>
                </b-table>
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="10"
                    aria-controls="downTable"
                    align="end"
                ></b-pagination>
            </b-container>
        </section>
        <Foot></Foot>
    </div>
</template>
<script>
import MyHeader from "./child/MyHeader.vue";
import Foot from "./child/Foot.vue";
import request from "@/api/req.js";
import { formatDate } from "@/filter";
import { CheckLogin } from "@/utils/validate.js";
import i18n from "../i18n.js";
import { bus } from "@/utils/bus.js";
export default {
    name: "Task",
    components: { MyHeader, Foot },
    filters: {
        formatExtStatus(status) {
            if (status == 1) {
                return i18n.t("task.ext.suc");
            }
            return i18n.t("task.ext.fail");
        },
        filterTime(str) {
            if (str == 0) {
                return "--";
            } else {
                return formatDate(str);
            }
        },
        filterStatus(status) {},
    },
    data() {
        return {
            extract_url: "",
            extLoading: false,
            place_extract: this.$t("task.placehoder"),
            ext_fields: [
                { key: "name", label: "File Name" },
                { key: "size", label: "Size" },
                { key: "status", label: "Status" },
                { key: "op", label: "Operation" },
            ],
            ext_items: [],
            downBusy: false,
            down_fields: [
                { key: "down_name", label: "File Name" },
                { key: "size", label: "Bandwidth" },
                { key: "detail", label: "Detail" },
                { key: "ctime", label: "Created" },
                { key: "expire_time", label: "Expired" },
                { key: "op", label: "Operation" },
            ],
            down_items: [],
            currentPage: 1,
            totalRows: 0,
            ws: null,
            ping: 30000,
            timer: null,
        };
    },
    mounted() {
        this.initWs(false);
        this.getTask();
    },
    methods: {
        initWs(reconnect) {
            if ("WebSocket" in window) {
                var info = CheckLogin();
                if (info != undefined) {
                    this.ws = new WebSocket(
                        "ws://www.sharecloud.cc/ws?token=" + info.token
                        // "ws://127.0.0.1:18001/ws?token=" + info.token
                    );
                    if (reconnect && this.timer != null) {
                        clearInterval(this.timer);
                    }
                    this.ws.onmessage = this.onMessage;
                    this.ws.onopen = this.onOpen;
                    this.ws.operror = this.onError;
                    this.timer = setInterval(() => {
                        this.ws.send(JSON.stringify({ action: "ping" }));
                    }, this.ping);
                }
            } else {
                console.log("not support websocket");
            }
        },
        onOpen() {
            console.log("ws on open...");
        },
        onError() {
            this.initWs(true);
        },
        onMessage(e) {
            var data = JSON.parse(e.data);
            if (data.action == "download") {
                var body = JSON.parse(data.body);
                if (body.complete == "1") {
                    //下载完成,刷新列表
                    this.getTask();
                } else {
                    this.down_items.forEach((item, index) => {
                        if (item.id == body.id) {
                            var det =
                                this.$t("task.down.speed") +
                                body.speed +
                                "  " +
                                this.$t("task.down.percent") +
                                body.percent +
                                "%";
                            this.$set(
                                this.down_items,
                                index,
                                Object.assign(item, { detail: det })
                            );
                        }
                    });
                }
            }
        },
        destroyed() {
            if (this.timer != null) {
                clearInterval(this.timer);
            }
        },
        trsDownStatus(data) {
            //绑定下载按钮状态
            if (data.ext_down_status) {
                return data.ext_down_status;
            }
            return false;
        },
        parseUrl() {
            if (this.extract_url == null) {
                this.$message.error(this.$t("task.ext.null"));
                return;
            }
            var url = this.extract_url.replace(/^\s+|\s+$/g, "");
            if (url == undefined || url == "") {
                this.$message.error(this.$t("task.ext.null"));
                return;
            }
            var array = new Array();
            array.push(url);
            let dict = { list: array };
            this.extLoading = true;
            request
                .parseUrl(dict)
                .then((res) => {
                    this.extLoading = false;
                    if (res.code == 0) {
                        this.ext_items = res.data;
                    } else {
                        this.$message.error("提取失败");
                    }
                })
                .catch((e) => {
                    console.log(e);
                    this.extLoading = false;
                });
        },
        addTaskDownload(row) {
            let dict = { id: row.id };
            row.ext_down_status = true;
            request
                .addTask(dict)
                .then((res) => {
                    row.ext_down_status = false;
                    if (res.code == 0) {
                        this.getTask();
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    row.ext_down_status = true;
                });
        },
        delDownload(data) {},
        getTask() {
            var dict = {
                page: this.currentPage,
                limit: 10,
            };
            this.downBusy = true;
            request
                .getTasks(dict)
                .then((res) => {
                    this.downBusy = false;
                    if (res.code == 0 && res.data.content) {
                        this.totalRows = res.data.total;
                        this.down_items = this.dealTable(res.data.content);
                    }
                    if (res.code == 200002) {
                        this.$message.error(this.$t("login.session.out"));
                        bus.$emit("openLogin", true);
                    }
                })
                .catch((e) => {
                    console.log(e);
                    this.downBusy = false;
                    this.$message.error(this.$t("network.error"));
                });
        },
        dealTable(tables) {
            tables.forEach((element) => {
                if (element.status == 4) {
                    element.detail = this.$t("task.down.status.suc");
                } else if (element.status == 5) {
                    element.detail = this.$t("task.down.status.fail");
                } else if (element.status == 6) {
                    element.detail = this.$t("task.down.status.expire");
                }
            });
            return tables;
        },
        onCopySuc() {
            this.$message.success(this.$t("copy.suc"));
        },
        onCopyErr() {
            this.$message.success(this.$t("copy.fail"));
        },
    },
};
</script>
<style>
.bg-half-task {
    padding: 150px 0 100px;
    background-size: cover;
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    align-self: center;
    position: relative;
    background-position: center center;
}
</style>
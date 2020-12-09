<template>
    <div>
        <MyHeader></MyHeader>
        <section class="bg-half-170 bg-primary">
            <div class="bg-overlay"></div>
            <b-container>
                <b-row>
                    <b-col sm="9">
                        <b-form-textarea
                            v-model="extract_url"
                            placeholder="extract url..."
                            rows="5"
                            max-rows="5"
                            size="lg"
                        >
                        </b-form-textarea>
                    </b-col>
                    <b-col align-self="center">
                        <b-button variant="primary" size="lg">Extract</b-button>
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
                    :busy="extBusy"
                    striped
                    bordered
                    hover
                    caption-top
                    show-empty
                >
                    <template #table-caption>Extract List</template>
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </template>
                    <template #cell(op)="data">
                        <b-button
                            v-if="data.item.status == 1"
                            @click="parseUrl(data)"
                            >Extract</b-button
                        >
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
                >
                    <template #table-caption>File Download List</template>
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </template>
                    <template #cell(op)="row">
                        <span v-for="tmp in row.download_list" :key="tmp.id">
                            <b-button
                                v-clipboard:copy="tmp.msg"
                                v-clipboard:success="onCopySuc"
                                v-clipboard:error="onCopyErr"
                                >Down{{ tmp.id }}</b-button
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
export default {
    name: "Task",
    components: { MyHeader, Foot },
    data() {
        return {
            extract_url: "",
            extBusy: false,
            ext_fields: [
                { key: "file_name", label: "File Name" },
                { key: "size", label: "Size" },
                { key: "url", label: "Url" },
                { key: "status", label: "Status" },
                { key: "op", label: "Operation" },
            ],
            ext_items: [],
            downBusy: false,
            down_fields: [
                { key: "file_name", label: "File Name" },
                { key: "size", label: "Bandwidth" },
                { key: "detail", label: "Detail" },
                { key: "create_time", label: "Created" },
                { key: "expire_time", label: "Expired" },
                { key: "op", label: "Operation" },
            ],
            down_items: [],
            currentPage: 1,
            totalRows: 0,
        };
    },
    methods: {
        parseUrl(data) {},
        delDownload(data) {},
        onCopySuc() {
            this.$message.success("copy success");
        },
        onCopyErr() {
            this.$message.success("copy fail");
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
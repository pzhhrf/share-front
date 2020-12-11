<template>
    <div>
        <b-card
            no-body
            class="border-0 rounded mb-2"
            v-for="items in desc"
            :key="items.index"
        >
            <a
                data-toggle="collapse"
                v-b-toggle="items.id"
                class="faq position-relative"
            >
                <b-card-header class="border-0 bg-light p-3 pr-5">
                    <h6 class="title mb-0">{{ items.title }}</h6>
                </b-card-header>
            </a>
            <b-collapse
                :id="items.id"
                :accordion="items.id"
                :visible="items.visible"
            >
                <b-card-body :id="items.id" class="p-4">
                    <ul class="list-unstyled mb-0">
                        <li
                            class="text-muted my-2"
                            v-for="item in items.desc"
                            :key="item.index"
                        >
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
                                class="feather feather-arrow-right-circle fea icon-ex-md text-primary mr-2"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 16 16 12 12 8"></polyline>
                                <line
                                    x1="8"
                                    y1="12"
                                    x2="16"
                                    y2="12"
                                ></line></svg
                            >{{ item }}
                        </li>
                    </ul>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>
<script>
export default {
    props: ["desc"],
    data() {
        return {};
    },
};
</script>
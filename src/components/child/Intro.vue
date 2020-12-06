<template>
    <div class="col-lg-4 col-md-6 col-12 mt-4 pt-2">
        <div class="card services p-4 rounded-pill border-0">
            <div class="icon text-center mb-4">
                <img :src="imgUrl" alt="" />
            </div>
            <div class="card-body p-0 content">
                <h5 class="mb-3">
                    <span class="title text-dark">{{ title }}</span>
                </h5>
                <p class="text-muted mb-3">
                    {{ introduce }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "HomeIntro",
    props: ["image", "title", "introduce"],
    computed: {
        imgUrl() {
            return require("../../assets/images/" + this.image);
        },
    },
};
</script>
<template>
    <div>
        <MyHeader></MyHeader>
        hello
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
};
</script>
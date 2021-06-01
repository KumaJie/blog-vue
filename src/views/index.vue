<template>
    <el-container>
        <el-header class="header">
            <blog-header></blog-header>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
import BlogHeader from "../components/blog-header.vue";

export default {
    components: {
        BlogHeader,
    },
   
};
</script>

<style>
.header {
    margin: 0 80px;
}
</style>
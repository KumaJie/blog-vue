<template>
    <el-container>
        <el-header class="header">
            <blog-header></blog-header>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <blog-footer></blog-footer>
        </el-footer>
    </el-container>
</template>

<script>
import BlogHeader from "../components/blog-header.vue"
import BlogFooter from '../components/blog-footer.vue'
export default {
    components: {
        BlogHeader,
        BlogFooter
    },
   
};
</script>

<style>
.header {
    margin: 0 80px;
}
</style>
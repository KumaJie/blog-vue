<template>
    <el-row style="min-width:1314px">
        <el-col :span="10">
            <div class="icon">Easy Blog</div>
        </el-col>
        <el-col :span="10" class="title"
            ><el-link href="/index" :underline="false">主页</el-link></el-col
        >
        <el-col :span="2" class="title"
            ><el-link href="/index/editor" :underline="false"
                >发布新文章</el-link
            ></el-col
        >
        <el-col :span="1" class="title"
            ><el-link href="/login" :underline="false"
                >登录</el-link
            ></el-col
        >
        <el-col :span="1" class="title"
            ><el-link href="/register" :underline="false"
                >注册</el-link
            ></el-col
        >
    </el-row>
</template>

<script>
export default {};
</script>

<style>
.icon::before {
    content: "";
    display: inline-block;
    background-image: url("../assets/img/blog.png");
    background-size: 100% 100%;
    background-position: center center;
    height: 30px;
    width: 30px;
    margin-right: 15px;
    vertical-align: -4px;
}
.icon {
    font-size: 30px;
    line-height: 60px;
}
.title {
    font-size: 18px !important;
    line-height: 60px;
}
</style>
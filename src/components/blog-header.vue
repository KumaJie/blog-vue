<template>
    <el-row>
        <el-col :span="10">
            <div class="icon">Easy Blog</div>
        </el-col>
        <el-col :span="10" class="title">主页</el-col>
        <el-col :span="1" class="title">登录</el-col>
        <el-col :span="1" class="title">注册</el-col>
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
    height: 40px;
    width: 40px;
    margin-right: 15px;
    vertical-align: -5px;
}
.icon {
    font-size: 40px;
}
.title {
    font-size: 18px;
    line-height: 60px;
}
</style>
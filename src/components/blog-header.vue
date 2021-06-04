<template>
    <el-row style="min-width: 1314px">
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
        <el-col :span="1" class="title" v-if="!ifLogin"
            ><el-link href="/login" :underline="false">登录</el-link></el-col
        >
        <el-col :span="1" class="title" v-if="!ifLogin"
            ><el-link href="/register" :underline="false">注册</el-link></el-col
        >
        <el-col :span="2" v-if="ifLogin">
            <el-avatar :src="userImg" icon="el-icon-user-solid"></el-avatar>
            <span>{{userName}}</span>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            userImg:
                "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            userName: "",
            ifLogin: false,
        };
    },
    mounted() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userInfo != "") {
            this.userImg = userInfo.userImg;
            this.userName = userInfo.userName;
            this.ifLogin = true;
        }
    },
};
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
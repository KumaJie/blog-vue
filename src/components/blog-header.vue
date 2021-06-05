<template>
    <el-row style="min-width: 1314px">
        <el-col :span="10">
            <div class="icon">Easy Blog</div>
        </el-col>
        <el-col :span="9" class="title"
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
        <el-col :span="3" v-if="ifLogin">
            <div style="display: flex">
                <el-avatar
                    :src="userImg"
                    style="margin-right: 10px; position: relative; top: 10px"
                ></el-avatar>
                <el-dropdown @command="command">
                    <span style="line-height: 60px"
                        >{{ userName }}
                        <i class="el-icon-arrow-down el-icon--right"></i
                    ></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user" command="info"
                            >个人信息</el-dropdown-item
                        >
                        <el-dropdown-item icon="el-icon-reading" command="blog"
                            >个人博客</el-dropdown-item
                        >
                        <el-dropdown-item
                            icon="el-icon-close"
                            command="loginOut"
                            >退出登录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data() {
        return {
            userId: '',
            userImg: '',
            userName: '',
            ifLogin: false,
        };
    },
    methods: {
        command(com) {
            switch (com) {
                case "info":
                    this.showInfo()
                    break
                case "blog":
                    this.showBlog()
                    break;
                case "loginOut":
                    this.loginOut()
                    break;
            }
        },
        showInfo() {

        },
        showBlog() {
            this.$router.push("/index/myblog/"+this.userId)
        },
        loginOut() {
            sessionStorage.removeItem('userInfo')
            this.ifLogin = false
            this.$router.replace('/')
        },
    },
    mounted() {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        if (userInfo) {
            this.userId = userInfo.userId
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
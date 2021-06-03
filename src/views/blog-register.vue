<template>
    <div>
        <el-page-header
            @back="backIndex"
            content="注册"
            style="margin-top: 15px"
        ></el-page-header>
        <div class="wrap">
            <span class="register-head">注册</span>
            <el-form
                label-position="top"
                label-width="80px"
                size="medium"
                :model="form"
            >
                <el-form-item label="用户id"
                    ><el-input v-model="form.userId"></el-input
                ></el-form-item>
                <el-form-item label="用户名"
                    ><el-input v-model="form.userName"></el-input
                ></el-form-item>
                <el-form-item label="用户密码"
                    ><el-input v-model="form.userPwd" show-password></el-input
                ></el-form-item>
                <el-form-item label="重复输入密码"
                    ><el-input v-model="form.repeatPwd" show-password></el-input
                ></el-form-item>
                <el-form-item size="large">
                    <el-button @click="onSubmit">注册</el-button>
                </el-form-item>
            </el-form>
            <el-link href="login">已有帐号？点击登录</el-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {},
        };
    },
    methods: {
        backIndex() {
            this.$router.push("/index");
        },
        onSubmit() {
            const h = this.$createElement;
            this.$http({
                method: "post",
                url: "user/regist",
                data: { ...this.form },
            })
                .then((result) => {
                    this.$notify({
                        title: "注册成功",
                        message: h(
                            "i",
                            { style: "color: teal" },
                            "注册成功,即将返回首页"
                        ),
                    });
                    setTimeout(() => {
                        this.backIndex()
                    }, 1000);
                })
                .catch((err) => {});
        },
    },
};
</script>

<style>
.register-head {
    display: block;
    color: #464d5f;
    text-align: center;
    font-size: 36px;
    margin-bottom: 20px;
}
.wrap {
    margin: 0 auto;
    max-width: 620px;
}
</style>
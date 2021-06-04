<template>
    <div>
        <el-page-header
            @back="backIndex"
            content="登录"
            style="margin-top: 15px"
        ></el-page-header>
        <div class="wrap">
            <span class="login-head">登录</span>
            <el-form
                label-position="top"
                size="medium"
                :model="form"
                status-icon
                :rules="rules"
                ref="loginForm"
            >
                <el-form-item label="用户ID" prop="userId"
                    ><el-input
                        placeholder="请输入ID"
                        v-model="form.userId"
                        prefix-icon="el-icon-user"
                    ></el-input
                ></el-form-item>
                <el-form-item label="用户密码" prop="userPwd"
                    ><el-input
                        placeholder="请输入密码"
                        v-model="form.userPwd"
                        prefix-icon="el-icon-lock"
                        show-password
                    ></el-input
                ></el-form-item>
                <el-form-item size="large">
                    <el-button @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
            <el-link href="register">没有帐号？点击注册</el-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {},
            rules: {
                userId: [
                    {
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error("请输入ID"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
                userPwd: [
                    {
                        validator: (rule, value, callback) => {
                            if (this.form.userId && !value) {
                                callback(new Error("请输入密码"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        backIndex() {
            this.$router.push("/index");
        },
        onSubmit() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    const h = this.$createElement;
                    this.$http({
                        method: "post",
                        url: "user/login",
                        data: { ...this.form },
                    })
                        .then((result) => {
                            console.log(result);
                            if (result.data == "") {
                                this.$notify({
                                    title: "登录失败",
                                    message: h(
                                        "i",
                                        { style: "color: teal" },
                                        "检查账户或密码"
                                    ),
                                });
                            } else {
                                this.$notify({
                                    title: "登录成功",
                                    message: h(
                                        "i",
                                        { style: "color: teal" },
                                        "注册成功,即将返回首页"
                                    ),
                                });
                                sessionStorage.setItem(
                                    "userInfo",
                                    JSON.stringify(result.data)
                                );
                                setTimeout(() => {
                                    this.backIndex();
                                }, 1000);
                            }
                        })
                        .catch((err) => {
                            this.$message({
                                message: "服务器状态异常",
                                type: "error",
                            });
                        });
                } else {
                    this.$message({
                        message: "请输入完整的id和密码",
                        type: "warning",
                    });
                }
            });
        },
    },
};
</script>

<style>
.login-head {
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
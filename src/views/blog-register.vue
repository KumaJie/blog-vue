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
                status-icon
                :model="form"
                :rules="rules"
                ref="registerForm"
            >
                <el-form-item label="用户ID" prop="userId"
                    ><el-input
                        placeholder="请输入ID"
                        v-model="form.userId"
                        prefix-icon="el-icon-user"
                    ></el-input
                ></el-form-item>
                <el-form-item label="用户名" prop="userName"
                    ><el-input
                        placeholder="请输入用户名"
                        v-model="form.userName"
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
                <el-form-item label="重复输入密码" prop="repeatPwd"
                    ><el-input
                        placeholder="请再次输入密码"
                        v-model="form.repeatPwd"
                        prefix-icon="el-icon-lock"
                        show-password
                    ></el-input
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
            rules: {
                userId: [
                    {
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error("ID不能为空"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
                userName: [
                    {
                        validator: (rule, value, callback) => {
                            if (!value) {
                                callback(new Error("用户名不能为空"));
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
                            if (!value) {
                                callback(new Error("请输入密码"));
                            } else {
                                if (this.form.repeatPwd) {
                                    this.$refs.registerForm.validateField(
                                        "repeatPwd"
                                    );
                                }
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
                repeatPwd: [
                    {
                        validator: (rule, value, callback) => {
                            if (this.form.userPwd && !value) {
                                callback(new Error("请再次输入密码"));
                            } else if (value !== this.form.userPwd) {
                                callback(new Error("两次输入密码不一致！"));
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
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
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
                                duration: 1000
                            });
                            setTimeout(() => {
                                this.backIndex();
                            }, 1000);
                        })
                        .catch((err) => {
                            this.$message({
                                message: "服务器状态异常",
                                type: "error",
                            });
                        });
                } else {
                    this.$message({
                        message: "请完善注册信息",
                        type: "warning",
                    });
                }
            });
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
<template>
    <div>
        <el-page-header
            @back="backIndex"
            content="个人信息"
            style="margin-top: 15px; margin-bottom: 40px"
        ></el-page-header>
        <el-row>
            <el-col :span="24" style="text-align: center">
                <el-image
                    class="user-avater"
                    :src="userInfo.userImg"
                ></el-image>
                <div class="name">欢迎用户{{ userInfo.userName }}</div>
            </el-col>

            <el-col :span="8" :offset="8" style="margin-top:25px">
                <el-tabs tab-position="left" value="first">
                    <el-tab-pane label="个人信息" name="first">
                        <!-- <span>欢迎用户{{ userInfo.userName }}</span> -->
                        <el-form label-position="left">
                            <el-form-item label="修改头像"
                                ><el-upload
                                    class="avatar-uploader"
                                    action="http://localhost:8085/user/modifyImg"
                                    :data="userInfo"
                                    :show-file-list="false"
                                    :on-success="changeImg"
                                >
                                    <img
                                        :src="userInfo.userImg"
                                        class="avatar"
                                    /> </el-upload
                            ></el-form-item>
                            <el-form-item label="用户昵称">
                                <el-input v-model="userInfo.userName"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="密码修改" name="second">
                        <el-form
                            :model="changePwdForm"
                            :rules="pwdRules"
                            status-icon
                            ref="changePwdForm"
                        >
                            <el-form-item label="原密码" prop="oldPass">
                                <el-input
                                    show-password
                                    v-model="changePwdForm.oldPass"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newPass">
                                <el-input
                                    show-password
                                    v-model="changePwdForm.newPass"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="重复密码" prop="checkPass">
                                <el-input
                                    show-password
                                    v-model="changePwdForm.checkPass"
                                ></el-input>
                            </el-form-item>
                            <el-form-item size="large">
                                <el-button @click="changePwd"
                                    >提交更改</el-button
                                >
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                userImg:
                    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            },
            changePwdForm: {
                oldPass: "",
                newPass: "",
                checkPass: "",
            },
            pwdRules: {
                oldPass: [
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.userInfo.userPwd) {
                                callback(new Error("原密码错误"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
                newPass: [
                    {
                        validator: (rule, value, callback) => {
                            if (this.changePwdForm.oldPass && !value) {
                                callback(new Error("请输入新密码"));
                            } else {
                                if (this.changePwdForm.checkPass) {
                                    this.$refs.changePwdForm.validateField(
                                        "checkPass"
                                    );
                                }
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
                checkPass: [
                    {
                        validator: (rule, value, callback) => {
                            if (this.changePwdForm.newPass && !value) {
                                callback(new Error("请再次输入密码"));
                            } else if (value !== this.changePwdForm.newPass) {
                                callback(new Error("两次输入密码不一致！"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur",
                    },
                ],
            },
            imageUrl: "",
        };
    },
    methods: {
        backIndex() {
            this.$router.push("/index");
        },
        changePwd() {
            this.$refs.changePwdForm.validate((valid) => {
                if (valid) {
                    this.$http({
                        method: "post",
                        url: "user/modifyPwd",
                        data: {
                            userId: this.userInfo.userId,
                            userPwd: this.changePwdForm.newPass,
                        },
                    }).then((result) => {
                        this.$notify({
                            title: "修改密码成功",
                            message: this.$createElement(
                                "i",
                                { style: "color: teal" },
                                "修改成功"
                            ),
                            duration: 1000,
                        });
                        this.userInfo.userPwd = this.changePwdForm.newPass;
                        sessionStorage.setItem(
                            "userInfo",
                            JSON.stringify(this.userInfo)
                        );
                        this.changePwdForm = {};
                    });
                } else {
                    this.$message({
                        message: "请查看提示",
                        type: "warning",
                    });
                }
            });
        },
        changeImg(response){
            this.userInfo.userImg = response
            sessionStorage.setItem('userInfo',JSON.stringify(this.userInfo))
        }
    },
    mounted() {
        this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    },
};
</script>

<style>
.user-avater {
    height: 250px;
    width: 250px;
    border-radius: 50%;
}
.name {
    margin-top: 10px;
    font-size: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f6f6f6;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
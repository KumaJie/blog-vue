<template>
    <div v-if="show">
        {{ articleId }}
        <el-form>
            <el-form-item label="发表评论" :model="form">
                <el-input
                    type="textarea"
                    v-model="form.commentContent"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="onSubmit"
                    >发表</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        articleId: String,
    },
    data() {
        return {
            show: false,
            form: {
                articleId: "",
                userId: "",
                commentContent: "",
            },
        };
    },
    watch: {
        articleId(val) {
            this.form.articleId = val;
            this.getComment()
        },
    },
    methods: {
        onSubmit() {
            this.$http({
                method: "post",
                url: "comment/add",
                data: { ...this.form },
            })
                .then((result) => {
                    this.$notify({
                        title: "评论成功",
                        message: this.$createElement(
                            "i",
                            { style: "color: teal" },
                            "评论成功"
                        ),
                        duration: 1000,
                    });
                })
                .catch((err) => {});
        },
        getComment() {
            console.log(this.form.articleId)
            this.$http({
                method: "get",
                url: "comment/findListByArticleId",
                params: {
                    articleId: this.form.articleId,
                },
            })
                .then((result) => {
                    console.log(result)
                })
                .catch((err) => {});
        },
    },
    mounted() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userInfo) {
            this.show = true;
            this.form.userId = userInfo.userId;
        } else {
            this.show = false;
        }
    },
};
</script>

<style>
</style>
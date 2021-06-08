<template>
    <div>
        <el-input placeholder="请输入标题" v-model="article.articleTitle">
            <template slot="prepend">文章标题</template>
        </el-input>
        <mavon-editor
            @change="change"
            class="editor"
            v-model="article.articleContent"
        />
        <el-button
            type="primary"
            round
            @click="submit"
            v-loading.fullscreen.lock="load"
            style="margin-top: 10px"
            >发布文章</el-button
        >
    </div>
</template>

<script>
export default {
    data() {
        return {
            load: false,
            article: {
                userId: "",
                categoriesId: "1",
                articleTitle: "",
                articleContent: "",
            },
        };
    },
    methods: {
        change(value) {
            this.article.articleContent = value;
        },
        submit() {
            if (this.$route.params.articleId) {
                this.modify();
                return;
            }
            this.load = true;
            this.$http({
                method: "post",
                url: "/article/add",
                data: { ...this.article },
            })
                .then((result) => {
                    this.load = false;
                    this.$notify({
                        title: "上传成功",
                        message: this.$createElement(
                            "i",
                            { style: "color: teal" },
                            "您的博客已经成功上传"
                        ),
                    })
                    this.$router.push('/index/myblog/'+this.article.userId)
                })
                .catch((err) => {
                    this.load = false;
                    this.$notify({
                        title: "上传失败",
                        message: h("i", { style: "color: teal" }, "上传失败"),
                    })
                });
        },
        modify() {
            this.load = true;
            this.$http({
                method: "post",
                url: "/article/modifyContent",
                data: { ...this.article },
            })
                .then((result) => {
                    this.load = false;
                    this.$notify({
                        title: "修改成功",
                        message: this.$createElement(
                            "i",
                            { style: "color: teal" },
                            "您的博客已经成功修改"
                        ),
                    });
                    this.$router.push('/index/detail/'+this.article.articleId)
                })
                .catch((err) => {
                    this.load = false;
                    this.$notify({
                        title: "上传失败",
                        message: h("i", { style: "color: teal" }, "上传失败"),
                    });
                });
        },
    },
    mounted() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userInfo) {
            this.article.userId = userInfo.userId;
            if (this.$route.params.articleId) {
                // 请求内容
                this.$http({
                    method: "post",
                    url: "article/findById",
                    params: {
                        articleId: this.$route.params.articleId,
                    },
                })
                    .then((result) => {
                        console.log(result);
                        this.article = result.data;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } else {
            this.$notify({
                title: "请先登录",
                message: this.$createElement(
                    "i",
                    { style: "color: teal" },
                    "登录后才可使用编辑器"
                ),
                duration: 1500,
            });
            this.$router.push("/login");
        }
    },
};
</script>
<style >
.editor {
    height: 500px;
}
</style>
    
<template>
    <div>
        <el-input placeholder="请输入标题" v-model="article.articleTitle">
            <template slot="prepend">文章标题</template>
        </el-input>
        <mavon-editor @change="change" class="editor" />
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
            html: "",
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
            console.log({ ...this.article });
            const h = this.$createElement;
            this.load = true;
            this.$http({
                method: "post",
                url: "/article/add",
                data: { ...this.article },
            })
                .then((result) => {
                    console.log(result);
                    setTimeout(() => {
                        this.load = false;
                        this.$notify({
                            title: "上传成功",
                            message: h(
                                "i",
                                { style: "color: teal" },
                                "您的博客已经成功上传"
                            ),
                        });
                    }, 3000);
                })
                .catch((err) => {
                    console.log(err);
                    setTimeout(() => {
                        this.load = false;
                        this.$notify({
                            title: "上传失败",
                            message: h(
                                "i",
                                { style: "color: teal" },
                                "上传失败"
                            ),
                        });
                    }, 3000);
                });
        },
    },
    mounted() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
        const h = this.$createElement
        if (userInfo) {
            this.article.userId = userInfo.userId
        } else {
            this.$notify({
                title: "请先登录",
                message: h("i", { style: "color: teal" }, "登录后才可使用编辑器"),
                duration: 1500
            });
            this.$router.push("/login")
        }
    },
};
</script>
<style >
.editor {
    height: 500px;
}
</style>
    
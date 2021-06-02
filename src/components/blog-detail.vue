<template>
    <div style="margin:0 15%">
        <mavon-editor v-model="content.articleContent" @change="change" style="display: none" />
        <div class="markdown-body" v-html="html"></div>
         <el-backtop ></el-backtop>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: {
                articleContent: '',
            },
            html:''
        };
    },
    methods: {
        change(e,render){
            this.html = render
        }
    },
    mounted() {
        const articleId = this.$route.params.articleId;
        // 请求内容
        this.$http({
            method: "post",
            url: "article/findById",
            params: {
                articleId,
            },
        })
            .then((result) => {
                this.content = result.data;
            })
            .catch((err) => {
                console.log(err);
            });
        // 增加浏览数量
        this.$http({
            method: "post",
            url: "article/updateView",
            params: {
                articleId,
            },
        })
            .then((result) => {})
            .catch((err) => {});
    },
};
</script>

<style>
</style>
<template>
    <div>
        <mavon-editor style="display:none"/>
        <div class="markdown-body" v-html="compileMd"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: {
                articleContent: "",
            },
        };
    },
    computed: {
        compileMd() {
            return this.$marked(this.content.articleContent);
        },
    },
    mounted() {
        const articleId = this.$route.params.articleId;
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
    },
};
</script>

<style>
</style>
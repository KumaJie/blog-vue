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
        <div class="markdown-body" v-html="html"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            html: '',
            load: false,
            article: {
                userId: '',
                categoriesId: '',
                articleTitle: '',
                articleContent: ''
            }
        };
    },
    methods: {
        change(value, render) {
            this.article.articleContent = value
            this.html = render
        },
        submit() {
            console.log({...this.article})
            const h = this.$createElement
            this.load = true
            this.$http({
                method: 'post',
                url: '/article/add',
                data:{...this.article}
            }).then((result) => {
                console.log(result)
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
            }).catch((err) => {
                console.log(err)
                setTimeout(() => {
                    this.load = false;
                    this.$notify({
                        title: "上传失败",
                        message: h(
                            "i",
                            { style: "color: teal" },
                            "上传失败"
                        ),
                    })
                }, 3000)
            })
            
        },
    },
    mounted(){
        this.article.userId = '1'
        this.article.categoriesId = 1
    }
};
</script>
<style >
.editor {
    height: 500px;
}
</style>
    
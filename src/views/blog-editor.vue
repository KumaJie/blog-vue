<template>
    <div>
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
        };
    },
    methods: {
        change(e, render) {
            console.log(render);
            this.html = render;
        },
        submit() {
            const h = this.$createElement;
            this.load = true;
            setTimeout(() => {
                this.load = false;
                this.$notify({
                  title: '上传成功',
                  message: h('i', { style: 'color: teal'}, '您的博客已经成功上传')
                });
            }, 3000);
        },
    },
};
</script>
<style >
.editor {
    height: 500px;
}

</style>
    
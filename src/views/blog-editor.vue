<template>
    <div>
            <mavon-editor :value="value" @change="change"/>
        <div  class="markdown-body" v-html="html"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: "# hello",
            html: ''
        };
    },
    methods: {
        change(e, render){
            console.log(render)
            this.html = render
        }
    },
};
</script>
    
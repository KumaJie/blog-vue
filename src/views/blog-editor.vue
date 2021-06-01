<template>
    <div>
        <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            :value="input"
            @input="update"
        ></textarea>
        <div v-html="compiledMarkdown"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: "# hello",
        };
    },
    computed: {
        compiledMarkdown() {
            return this.$marked(this.input)
        },
    },
    methods: {
        update(e){
            this.input = e.target.value
        }
    },
};
</script>
    
<style>
</style>
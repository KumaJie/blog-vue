<template>
    <ul class="main-ul">
        <li v-for="blog in blogs" :key="blog.articleDate">
            <el-link
                class="blog-title"
                :href="'/index/detail/' + blog.articleId"
                >{{ blog.articleTitle }}</el-link
            >
            <el-row class="blog-description">
                <el-col :span="2"
                    ><el-avatar
                        :size="80"
                        shape="square"
                        :src="require('../assets/img/avatar.png')"
                        :fit="'cover'"
                    ></el-avatar
                ></el-col>
                <el-col :span="22">{{ blog.articleContent }}</el-col>
            </el-row>
            <el-row class="blog-info">
                <el-col :span="2">{{ blog.userId }}</el-col>
                <el-col :span="3">{{ blog.articleDate }}</el-col>
                <el-col :span="1"
                    ><el-link icon="el-icon-star-on" :underline="false">{{
                        blog.articleLike
                    }}</el-link></el-col
                >
                <el-col :span="1"
                    ><el-link
                        icon="el-icon-chat-dot-square"
                        :underline="false"
                        :href="'/index/detail/' + blog.articleId"
                        >{{ blog.commentSum }}</el-link
                    ></el-col
                >
                <el-col :span="1"
                    ><el-link
                        icon="el-icon-view"
                        :underline="false"
                        :href="'/index/detail/' + blog.articleId"
                        >{{ blog.articleView }}</el-link
                    ></el-col
                >
            </el-row>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            blogs: [],
        };
    },
    methods: {
        getAllBlogs() {
            this.$http({
                method: "post",
                url: "article/findListByView",
            })
                .then((result) => {
                    this.blogs = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getBlogByUserId(id) {
            this.$http({
                method: "get",
                url: "article/findListById",
                params: {
                    id,
                },
            })
                .then((result) => {
                    this.blogs = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    watch: {
        $route(to, from) {
            console.log(to);
            if (to.params.userId) {
                this.getBlogByUserId(to.params.userId);
            } else {
                this.getAllBlogs();
            }
        },
    },
    mounted() {
        this.getAllBlogs();
    },
};
</script>

<style>
.main-ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0px 30px;
}
.main-ul li {
    border-bottom: 1px solid #f6f6f6;
    padding-bottom: 10px;
}
.blog-title {
    font-size: 16px !important;
    margin: 10px 0;
}
.blog-description {
    font-size: 14px;
}
.blog-info {
    font-size: 12px;
    margin-top: 5px;
}
</style>
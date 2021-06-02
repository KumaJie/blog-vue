<template>
    <ul class="main-ul">
        <li v-for="blog in blogs" :key="blog.articleDate">
            <el-link
                class="blog-title"
                :href="'index/detail/' + blog.articleId"
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
                    ><el-link icon="el-icon-chat-dot-square" :underline="false"
                        >1</el-link
                    ></el-col
                >
                <el-col :span="1"
                    ><el-link icon="el-icon-view" :underline="false">{{
                        blog.articleView
                    }}</el-link></el-col
                >
            </el-row>
        </li>
        <li>
            <el-link class="blog-title">Redis学习笔记</el-link>
            <el-row class="blog-description">
                <el-col :span="2"
                    ><el-avatar
                        :size="80"
                        shape="square"
                        :src="require('../assets/img/avatar.png')"
                        :fit="'cover'"
                    ></el-avatar
                ></el-col>
                <el-col :span="22"
                    >作者：Grey 原文地址：Redis学习笔记八：集群模式
                    前面提到的Redis学习笔记七：主从复制和哨兵只能解决Redis的单点压力大和单点故障问题，接下来要讲的Redis
                    Cluster模式，主要是用来解决Redis的单点容量问题。
                    如何来解决Redis单点容量问题呢？
                    如果数据可以拆分，我们可以</el-col
                >
            </el-row>
            <el-row class="blog-info">
                <el-col :span="2">Grey Zeng</el-col>
                <el-col :span="3">2021-05-31 22:27</el-col>
                <el-col :span="1"
                    ><el-link icon="el-icon-star-on" :underline="false"
                        >1</el-link
                    ></el-col
                >
                <el-col :span="1"
                    ><el-link icon="el-icon-chat-dot-square" :underline="false"
                        >1</el-link
                    ></el-col
                >
                <el-col :span="1"
                    ><el-link icon="el-icon-view" :underline="false"
                        >1</el-link
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
    method: {},
    mounted() {
        this.$http({
            method: 'post',
            url: 'article/findListByViews',
            changeOrigin: true,
        })
            .then((result) => {
                this.blogs = result.data;
            })
            .catch((err) => {
                console.log(err);
            });
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
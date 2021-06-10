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
                        :src="blog.userImg"
                        :fit="'cover'"
                    ></el-avatar
                ></el-col>
                <el-col :span="22">{{ blog.articleContent }}</el-col>
            </el-row>
            <el-row class="blog-info">
                <el-col :span="2">{{ blog.userName }}</el-col>
                <el-col :span="3">{{ blog.articleDate }}</el-col>
                <el-col :span="1"
                    ><el-link
                        icon="el-icon-star-on"
                        :underline="false"
                        @click="addLike(blog.articleId)"
                        >{{ blog.articleLike }}</el-link
                    ></el-col
                >
                <el-col :span="1"
                    ><el-link
                        icon="el-icon-chat-dot-square"
                        :underline="false"
                        :href="'/index/detail/' + blog.articleId"
                        >{{ blog.commentSum }}</el-link
                    ></el-col
                >

                <el-col :span="10"
                    ><el-link
                        icon="el-icon-view"
                        :underline="false"
                        :href="'/index/detail/' + blog.articleId"
                        >{{ blog.articleView }}</el-link
                    ></el-col
                >
                <div v-if="homePage || ifRoot">
                    <el-col :span="2" v-if="!ifRoot"
                        ><el-link
                            icon="el-icon-edit"
                            :underline="false"
                            :href="'/index/modify/' + blog.articleId"
                            >修改博客</el-link
                        ></el-col
                    >
                    <el-col :span="2"
                        ><el-link
                            icon="el-icon-close"
                            :underline="false"
                            @click="deleteBlog(blog.articleId)"
                            >删除博客</el-link
                        ></el-col
                    >
                </div>
            </el-row>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            blogs: [],
            homePage: false,
            ifRoot: false,
        };
    },
    methods: {
        getAllBlogs() {
            this.homePage = false;
            this.$http({
                method: "get",
                url: "article/findListByView",
            })
                .then((result) => {
                    this.blogs = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getBlogByUserId(userId) {
            this.homePage = true;

            this.$http({
                method: "get",
                url: "article/findListById",
                params: {
                    userId,
                },
            })
                .then((result) => {
                    console.log(result.data);
                    this.blogs = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        deleteBlog(articleId) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$http({
                        method: "get",
                        url: "article/deleteById",
                        params: {
                            articleId,
                        },
                    })
                        .then((result) => {
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                            this.getBlogByUserId(this.$route.params.userId);
                        })
                        .catch((err) => {});
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        addLike(articleId) {
            console.log(articleId);
            this.$http({
                method: "get",
                url: "article/updateLike",
                params: {
                    articleId,
                },
            }).then((res) => {
                this.getAllBlogs()
            });
        },
    },
    watch: {
        $route(to, from) {
            if (to.params.userId) {
                const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                if (userInfo.userPower === "0") {
                    this.getAllBlogs();
                    this.ifRoot = true;
                } else {
                    this.getBlogByUserId(to.params.userId);
                    this.ifRoot = false;
                }
            } else {
                this.getAllBlogs();
            }
        },
    },
    mounted() {
        if (this.$route.params.userId) {
            const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            if (userInfo.userPower === "0") {
                this.getAllBlogs();
                this.ifRoot = true;
            } else {
                this.getBlogByUserId(this.$route.params.userId);
                this.ifRoot = false;
            }
        } else {
            this.getAllBlogs();
        }
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
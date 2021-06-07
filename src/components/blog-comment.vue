<template>
    <div>
        <ul class="comment-wrap">
            <li class="comment-head">评论</li>
            <li
                v-for="comment in comments"
                :key="comment.commentId"
                class="comment-box"
            >
                <div style="font-size: 14px;">{{ comment.commentContent }}</div>
                <el-row class="comment-info">
                    <el-col :span="3"
                        ><div>{{ comment.userName }}</div></el-col
                    >
                    <el-col :span="5"
                        ><div>{{ comment.commentDate }}</div></el-col
                    >
                    <el-col :span="5"
                        ><el-link
                            icon="el-icon-star-on"
                            :underline="false"
                            @click="addLike(comment.commentId)"
                            >{{ comment.commentLike }}</el-link
                        >
                    </el-col>
                </el-row>
            </li>
        </ul>
        <el-form v-if="show">
            <el-form-item label="发表评论" :model="form">
                <el-input
                    type="textarea"
                    v-model="form.commentContent"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="onSubmit"
                    >发表</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        articleId: String,
    },
    data() {
        return {
            show: false,
            form: {
                articleId: "",
                userId: "",
                commentContent: "",
            },
            comments: [],
        };
    },
    watch: {
        articleId(val) {
            this.form.articleId = val;
            this.getComment();
        },
    },
    methods: {
        onSubmit() {
            this.$http({
                method: "post",
                url: "comment/add",
                data: { ...this.form },
            })
                .then((result) => {
                    this.getComment();
                    this.$notify({
                        title: "评论成功",
                        message: this.$createElement(
                            "i",
                            { style: "color: teal" },
                            "评论成功"
                        ),
                        duration: 1000,
                    });
                })
                .catch((err) => {});
        },
        getComment() {
            this.$http({
                method: "get",
                url: "comment/findListByArticleId",
                params: {
                    articleId: this.form.articleId,
                },
            })
                .then((result) => {
                    this.comments = result.data;
                })
                .catch((err) => {});
        },
        addLike(commentId) {
            this.$http({
                method: "get",
                url: "comment/addLike",
                params: {
                    commentId,
                },
            })
                .then((result) => {
                    this.getComment();
                })
                .catch((err) => {});
        },
    },
    mounted() {
        const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
        if (userInfo) {
            this.show = true;
            this.form.userId = userInfo.userId;
        } else {
            this.show = false;
        }
    },
};
</script>

<style>
.comment-wrap {
    list-style: none;
}
.comment-head {
    margin: 20px 0;
    color: #606266;
    font-size: 20px;
}
.comment-box {
    border-bottom: 1px solid #f6f6f6;
    margin-bottom: 10px;
}
.comment-info {
    font-size: 12px;
    margin-top: 5px;
}
</style>
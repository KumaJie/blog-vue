<template>
    <div>
        <el-page-header
            @back="backIndex"
            content="个人信息"
            style="margin-top: 15px;margin-bottom: 70px;"
        ></el-page-header>
        <el-row>
            <el-col :span="24" style="text-align: center">
                <el-image
                    class="avater"
                    :src="userInfo.userImg"
                ></el-image>
                <div class="name">{{userInfo.userName}}</div>
            </el-col>
            <el-col>

            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userInfo: {
                userImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            }
        }
    },
    methods: {
        backIndex() {
            this.$router.push("/index");
        }
    },
    mounted(){
        this.userInfo =  JSON.parse(sessionStorage.getItem('userInfo'))
    }
};
</script>

<style>
.avater {
    height: 250px;
    width: 250px;
    border-radius: 50%;
}
.name{
    margin-top: 10px;
    font-size: 20px;
}
</style>
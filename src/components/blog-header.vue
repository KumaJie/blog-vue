<template>
  <el-row>
    <el-col :span=10>
        <div class="icon">Easy Blog</div>
    </el-col>
    <el-col :span=5>主页</el-col>
    <el-col :span=3>登录</el-col>
    <el-col :span=3>注册</el-col>
  </el-row>
</template>

<script>
export default {

}
</script>

<style>
    .icon::before{
        content: '';
        display: inline-block;
        background-image: url('../assets/img/blog.png');
        background-size: 100% 100%;
        height: 60px;
        width: 60px;
        margin-right: 15px;
        vertical-align: -15px;
    }
    .icon{
        font-size: 40px;   
    }
</style>
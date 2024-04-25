<script setup>

</script>

<template>
  <el-card class="page-container  animate__animated animate__bounceInUp">
    <img src="@/assets/images/403.png" alt="403">
    <div class="content">
      <h1>403</h1>
      <p>抱歉，你无权访问该页面</p>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </div>

  </el-card>
</template>

<style scoped lang="scss">

.page-container{
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  img {
    width: 300px;
    max-width: 100%;
    height: auto;
  }

  .content {
    margin-left: 70px;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1{
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    p{
      font-size: 15px;
      margin-bottom: 30px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
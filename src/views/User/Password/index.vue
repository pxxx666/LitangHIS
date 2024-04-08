<script setup>

</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>重置密码</span>
      </div>
    </template>
    <el-row>
      <el-col :span="10" :offset="6">
        <el-form  label-width="100px" size="large">
          <el-form-item label="原密码">
            <el-input type="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="nickname">
            <el-input type="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确定密码" prop="email">
            <el-input type="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain style="width: 500px">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="300px">
        <LayoutMenu></LayoutMenu>
      </el-aside>
      <el-container>
        <el-header id="header">
          <h1>Vue Router</h1>
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {
  ArrowRight
} from '@element-plus/icons-vue'
import LayoutMenu from "@/views/Layout/components/LayoutMenu.vue";
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.el-container {
  height: 100vh;
}



.el-header {
  border-bottom: 2px solid #ccc;
  text-align: center;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}


</style>
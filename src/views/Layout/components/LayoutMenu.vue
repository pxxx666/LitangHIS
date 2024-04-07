<script setup>

import {CreditCard, Histogram, HomeFilled, Pointer, UserFilled} from "@element-plus/icons-vue";
</script>

<template>
  <el-menu style="overflow: hidden;" active-text-color="#604f4f" background-color="#95c194" text-color="white"
           class="el-menu-vertical-demo" router>
    <div>
      <h1 style="margin:20px;font-weight: normal;color: white;">菜单</h1>
    </div>

    <el-sub-menu index="/">
      <template #title>
        <el-icon>
          <UserFilled />
        </el-icon>
        <span>用户管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userInfo">更改个人信息</el-menu-item>
        <el-menu-item index="/userAtavar">更换头像</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="/recharge">
      <el-icon>
        <CreditCard />
      </el-icon>
      <span>充值服务</span>
    </el-menu-item>
    <el-menu-item index="/appoint">
      <el-icon>
        <Pointer />
      </el-icon>
      <span>预约医生</span>
    </el-menu-item>
    <el-menu-item index="/hospital">
      <el-icon>
        <HomeFilled />
      </el-icon>
      <span>住院详情</span>
    </el-menu-item>
    <el-menu-item index="/echarts">
      <el-icon>
        <Histogram />
      </el-icon>
      <span>数据分析</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu{
  height: 100%;
}
</style>
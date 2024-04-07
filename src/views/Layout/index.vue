<script setup>
import {
  ArrowRight, CaretBottom, Crop, EditPen, SwitchButton, User
} from '@element-plus/icons-vue'
import LayoutMenu from "@/views/Layout/components/LayoutMenu.vue";
import {onMounted} from "vue";
import { useUserInfoStore } from '@/stores/useInfo.js'
import { userInfoService } from '@/apis/user.js'
const userInfoStore = useUserInfoStore()
const getUserInfo = async () => {
  let result = await userInfoService()
  userInfoStore.info = result.data;
}
onMounted(getUserInfo)

</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <LayoutMenu></LayoutMenu>
      </el-aside>
      <el-container>
        <el-header id="header">
          <img src="@/assets/images/HISTitle.png" alt="title">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>
          <el-dropdown placement="bottom-end">
                    <span class="el-dropdown__box">
                        <el-avatar />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
                <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
                <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
img{
  align-self: center;
  width: 450px;
}
.el-container {
  height: 100vh;
}

.el-dropdown{
  position: absolute;
  right: 20px;
  top: 40px;
  .el-dropdown__box {
    display: flex;
    align-items: center;

    .el-icon {
      color: #999;
      margin-left: 10px;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }
}


.el-header {
  background-color: white;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 0 10px #ccc;
}


</style>
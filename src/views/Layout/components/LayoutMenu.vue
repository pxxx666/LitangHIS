<script setup>
import {CreditCard, FirstAidKit, Histogram, HomeFilled, House, Pointer, UserFilled} from "@element-plus/icons-vue";
import {defineProps} from 'vue'
const props = defineProps({
  type:String
})
</script>

<template>
  <el-menu style="overflow: hidden;" active-text-color="#604f4f" background-color="#95c194" text-color="white"
           class="el-menu-vertical-demo" router>
    <div>
      <h1 v-if="props.type==='管理员'" style="margin:20px;font-weight: normal;color: white;">管理员菜单</h1>
      <h1 v-else-if="props.type==='医生'" style="margin:20px;font-weight: normal;color: white;">医生菜单</h1>
      <h1 v-else style="margin:20px;font-weight: normal;color: white;">患者菜单</h1>

    </div>

    <el-sub-menu index="/user">
      <template #title>
        <el-icon>
          <UserFilled />
        </el-icon>
        <span>个人信息管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/user/profile">更改个人信息</el-menu-item>
        <el-menu-item index="/user/password">更换密码</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="/doctor" v-if="props.type==='管理员'">
      <template #title>
        <el-icon>
          <FirstAidKit />
        </el-icon>
        <span>医生管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/doctor/log">医生录入管理</el-menu-item>
        <el-menu-item index="/doctor/profile">医生信息管理</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="/department" v-if="props.type==='管理员'">
      <el-icon>
        <House />
      </el-icon>
      <span>科室信息管理</span>
    </el-menu-item>
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
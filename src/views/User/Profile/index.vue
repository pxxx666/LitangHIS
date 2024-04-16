<script setup>
import { ref } from 'vue'
import { useUserInfoStore } from '@/stores/useInfo.js'
import {useTokenStore} from '@/stores/token.js'
import {userUpdateInfoService} from '@/apis/user.js'
import { ElMessage } from 'element-plus'
import {Avatar, Plus, Upload} from "@element-plus/icons-vue";
const userInfoStore = useUserInfoStore()
const tokenStore = useTokenStore()
const uploadRef = ref()
const userInfo = ref(JSON.parse(JSON.stringify(userInfoStore.info)))
const defaultAvatar = "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
const avatar = ref(userInfo.value.userPic)
const trueNameReg = /^[\u4e00-\u9fa5]/
const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}/
const idCardReg = /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
const rules = {
  trueName: [
    {
      pattern: trueNameReg,
      message: '真实姓名必须位汉字',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      pattern: phoneReg,
      message: '请输入有效电话号码',
      trigger: 'blur'
    }
  ],
  idCard:[
    {
      pattern: idCardReg,
      message:'请输入有效身份证号码',
      trigger: 'blur'
    }
  ]
}
const resetUserInfo = async () => {
  if(new RegExp(trueNameReg).test(userInfo.value.trueName) &&
    new RegExp(phoneReg).test(userInfo.value.phone) &&
      new RegExp(idCardReg).test(userInfo.value.idCard)
  ){
    const result = await userUpdateInfoService(userInfo.value)
    ElMessage.success("修改成功")
    userInfoStore.setInfo(userInfo.value)
  }else {
    ElMessage.error("数据不合法")
  }
}

const uploadSuccess = (url) => {
  console.log(url)
  avatar.value = url.data;
  userInfo.value.userPic = url.data;
  userInfoStore.setInfo(userInfo.value)
  ElMessage.success('头像修改成功')
}

</script>
<template>
  <el-card>
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <div style="display: flex;justify-content: space-around">
      <el-card style="width: 600px" shadow="hover">
        <template #header>
          <div class="header">
            <span>更换信息</span>
          </div>
        </template>
        <el-row>
          <el-alert v-if="userInfo.type==='医生'" title="成为正式医生前务必填好真实姓名以便管理员录入信息！" type="warning" style="margin-bottom: 20px"/>
          <el-col :span="20" :offset="1">
            <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
              <el-form-item label="用户名">
                <el-input v-model="userInfo.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="用户类型">
                <el-input v-model="userInfo.type" disabled></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="trueName">
                <el-input v-model="userInfo.trueName"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="userInfo.phone"></el-input>
              </el-form-item>

              <el-form-item label="证件码" prop="idCard">
                <el-input v-model="userInfo.idCard"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" plain @click="resetUserInfo">提交修改</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
      <el-card style="width: 600px" shadow="hover">
        <template #header>
          <div class="header">
            <span>更换头像</span>
          </div>
        </template>
        <el-row>
          <el-col :span="12" :offset="8">
            <el-upload
                ref="uploadRef"
                class="avatar-uploader"
                :show-file-list="false"
                :auto-upload="true"
                action="/api/upload"
                name="file"
                :headers="{
                  'Authorization':tokenStore.token
                }"
                :on-success="uploadSuccess"
            >
              <img v-if="avatar" :src="avatar" class="avatar" />
              <img v-else :src="defaultAvatar"  class="avatar" />
            </el-upload>
            <br />
            <el-button type="primary" plain style="width: 200px" :icon="Plus"  @click="uploadRef.$el.querySelector('input').click()">
              选择头像
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>

  </el-card>

</template>
<style lang="scss">
  //.main_card
  .avatar{
    width: 200px;
    height: 200px;
  }
</style>
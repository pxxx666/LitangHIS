<script setup>
import { ref } from 'vue'
import {User,Lock} from "@element-plus/icons-vue";
import {userRegisterService,userLoginService} from '@/apis/user.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import {useTokenStore} from '@/stores/token.js'
const tokenStore = useTokenStore()
const router = useRouter()
//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)
const registerData = ref({
  username: '',
  password: '',
  type: ''
})
const registerDataRules = ref({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名的长度必须为3~10位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度必须为6~20位', trigger: 'blur' }
  ]
})
//清除表单数据
const clearRegisterData = () => {
  registerData.value = {
    username: '',
    password: '',
    type: ''
  }
}
//注册
const register = async () => {
  if(registerData.value.username.length >= 2
      && registerData.value.username.length <= 10
      && registerData.value.password.length >= 6
      && registerData.value.password.length <= 20
      && registerData.value.type){
    //发送注册请求
    const result = await  userRegisterService(registerData.value)
    ElMessage({
      message: '注册成功！',
      type: 'success',
      plain: true,
    })
    //跳转到登录，清除表单
    isRegister.value = false
    clearRegisterData()
  }else {
    ElMessage({
      message: '注册信息有误，请重新输入！',
      type: 'error',
      plain: true,
    })
  }
}

//登录
const login = async () => {
  if(registerData.value.username && registerData.value.password){
    const result = await userLoginService(registerData.value)
    if(result.code == 0){
      ElMessage({
        message: '登录成功！',
        type: 'success',
        plain: true,
      })
      //存入token
      tokenStore.setToken(result.data)
      //登录成功，跳转到首页
      router.push('/')
    }
  }else {
    ElMessage({
      message: '登录信息不能为空！',
      type: 'error',
      plain: true,
    })}
}




</script>

<template>
  <img src="@/assets/images/HISTitle.png" alt="">
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">

      <!-- 注册表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData"
               :rules="registerDataRules">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <el-radio-group v-model="registerData.type" size="large">
            <el-radio-button label="患者" value="患者" />
            <el-radio-button label="医生" value="医生" />
          </el-radio-group>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space plain @click="register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData()">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="registerDataRules">
        <el-form-item>
          <!-- 标题 -->
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input name="username" :prefix-icon="User" placeholder="请输入用户名"
                    v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="registerData.password"></el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space plain @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData()">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
img{
  position: absolute;
  z-index: 100;
  width: 40%;
  right: 75px;
  top: 100px;
}
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
    url('@/assets/images/Login.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;


    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
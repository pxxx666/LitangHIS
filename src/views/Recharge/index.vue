<script setup>
import {ref} from "vue";
import {rechargeService} from '@/apis/user.js'
import {useUserInfoStore} from "@/stores/useInfo.js";
import {ElMessage} from "element-plus";
const userInfoStore = useUserInfoStore();
const userInfo = userInfoStore.info
const inPutvalue = ref(0)
let pics = [
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.EKwHHUVZLJmV8219kSzSIQHaE-?w=271&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      'https://tse2-mm.cn.bing.net/th/id/OIP-C.PfPeu3FUqSgg4XAqs79ksQHaE7?w=235&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      'https://tse3-mm.cn.bing.net/th/id/OIP-C.6xVlipE_xhfBtnNA1T2C9QHaEb?w=304&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      'https://tse4-mm.cn.bing.net/th/id/OIP-C.fVspA7GK8QOLc86yQJ3gqAHaFb?w=262&h=193&c=7&r=0&o=5&dpr=1.5&pid=1.7'
  ]
const submit = ()=>{
  if(inPutvalue.value>0){
    rechargeService(userInfo.id,userInfo.balance+inPutvalue.value)
    userInfo.balance += inPutvalue.value
    inPutvalue.value = 0
    ElMessage.success('充值成功')
  }else{
    ElMessage.error('请输入充值金额')
  }
}
</script>
<template>
  <el-card>

    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in pics" :key="item">
        <el-image style="width: 100%" :src="item"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-row style="margin-top: 50px">
      <el-col :span="10" :offset="6">
        <el-form  label-width="100px" size="large" >
          <el-form-item label="充值金额">
            <el-input label="请输入充值金额" type="number" v-model.number="inPutvalue"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain style="width: 500px" @click="submit">充值</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>

</template>

<style scoped>
</style>

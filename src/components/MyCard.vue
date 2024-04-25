<script setup>
    import { ElMessage, ElMessageBox } from 'element-plus'
    import {defineProps,ref,onMounted,inject} from "vue";
    import {useUserInfoStore} from '@/stores/useInfo.js'
    import {rechargeService} from '@/apis/user.js'
    import {addAppointmentService} from "@/apis/appointment.js";

    const userInfoStore = useUserInfoStore()
    const userInfo = userInfoStore.info
    let isButtonSelected = ref(false)
    const props = defineProps(['info'])

    const appoint = () => {
        ElMessageBox.confirm(
            '您确定要预约该医生?',
            'Warning',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info',
            }
        )
            .then(() => {
              if(!userInfo.idCard||!userInfo.trueName||!userInfo.phone){
                ElMessage({
                    type: 'info',
                    message: '请先完善个人信息',
                })
              }else if(userInfo.balance<props.info.price){
                ElMessage({
                  type: 'info',
                  message: '余额不足',
                })
              }else{
                ElMessage({
                  type: 'success',
                  message: '预约成功',
                })
                addAppointmentService({
                  patient:userInfo.trueName,
                  userId:userInfo.id,
                  phone:userInfo.phone,
                  doctor:props.info.trueName,
                  department:props.info.department,
                  price:props.info.price,
                  status:'待叫号'
                })
                rechargeService(userInfo.id,userInfo.balance-props.info.price)
                userInfo.balance -= props.info.price
              }
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '预约删除',
                })
            })
    }

</script>
<template>
    <el-card class="card" style="max-width: 320px" shadow="hover">
        <template #header>
            <div class="card-header">
                <div><b>{{props.info.department}}：</b>{{props.info.trueName}}<b style="color: #95c194">({{props.info.position}})</b></div>

            </div>
        </template>
        <el-image
            :src="props.info.userPic"
            style="width: 50%;border-radius: 50%;" lazy></el-image>
        <div class="content">
          <div><b>医生介绍：</b>{{props.info.description}}</div>
          <div class="num"><b>挂号数量：</b>{{props.info.count}}</div>
          <div><b>挂号价格：</b><span style="font-size: 20px">￥</span><span class="price">{{props.info.price}}</span> </div>
        </div>


        <template #footer><el-button id="button" size="large" style="width: 100px;" type="primary" plain
                @click="appoint" :disabled="isButtonSelected" v-if="userInfo.type==='患者'">预约</el-button></template>
    </el-card>

</template>
<style lang="scss">
    .card {

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 450px;
      .el-image {
        display: block;
        margin: 0 auto;
      }
      .content{
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        .price{
          color: red;
          font-size: 20px;
        }
      }
    }


</style>
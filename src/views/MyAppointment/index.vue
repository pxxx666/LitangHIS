<script setup>
import {appointmentListService,callNumberService,diagnosisService,hospitalService,finishService} from "@/apis/appointment.js";
import {addToHospitalService} from '@/apis/hospital.js'
import {ref,onMounted} from "vue";
import {useUserInfoStore} from "@/stores/useInfo.js";
import {ElMessage, ElMessageBox} from "element-plus";
const userInfoStore = useUserInfoStore()
const userInfo = userInfoStore.info
let appointmentList = ref([])
const dialogVisible = ref(false)
const selectedPatient = ref({})

const data = ref({
  id:0,
  message:''
})
//叫号
const toCallNumber = async (id)=>{
  let res = await callNumberService(id)
  ElMessage.success("叫号成功")
  await getAppointmentList()
}
const callNumber = (id) => {
  toCallNumber(id)
}
//诊断
const toDiagnosis = async (id,message)=>{
  let res = await diagnosisService(id,message)
  ElMessage.success("诊断结束")
  await getAppointmentList()
}
const diagnosis = (row) => {
  dialogVisible.value = true
  data.value.id = row.id
  selectedPatient.value = row
}
//结束诊断
const submit = () => {
  ElMessageBox.confirm(
      '您确定要提交诊断报告吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }
  )
      .then(async () => {
        await toDiagnosis(data.value)
        data.value.id = 0
        data.value.message = ''
        dialogVisible.value = false
        ElMessage({
          type: 'success',
          message: '提交成功',
        })

      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消提交',
        })
      })
}
//建议住院
const hospital = async (id,message) => {
  let res = await hospitalService(id,message)
  ElMessage.success("诊断结束")
  await getAppointmentList()
}
const toHospital = () => {
  ElMessageBox.confirm(
      '您确定要提交诊断报告吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }
  )
      .then(async () => {
        await hospital(data.value)
        data.value.id = 0
        data.value.message = ''
        dialogVisible.value = false
        ElMessage({
          type: 'success',
          message: '提交成功',
        })

      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消提交',
        })
      })
}
//住院
const addHospital = async () => {
  ElMessageBox.confirm(
      '您确定要住院吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }
  )
      .then(async () => {
        await finishService(selectedPatient.value.id)
        await addToHospitalService({
          userId:selectedPatient.value.userId,
          name:selectedPatient.value.patient,
          phone:selectedPatient.value.phone,
          department:selectedPatient.value.department,
          cost: 0,
          status:'住院中'
        })
        await getAppointmentList()
        ElMessage.success("住院成功")
        dialogVisible.value = false

      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消住院',
        })
      })

}
const getAppointmentList = async () => {
  let {data} = await appointmentListService()
  if(userInfo.type==='患者'){
    data = data.filter(item=>item.userId === userInfo.id)
  }
  if(userInfo.type==='医生'){
    data = data.filter(item=>item.doctor ===userInfo.trueName)
  }
  appointmentList.value = data
}
onMounted(()=>{
  getAppointmentList()
})
</script>

<template>
  <el-card class="page-container  animate__animated animate__bounceInUp">
    <template #header>
      <div class="header">
        <span>我的挂号信息</span>
      </div>
    </template>
    <el-table style="width: 100%" :data="appointmentList">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="姓名" prop="patient"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="挂号时间" prop="date" width="200"></el-table-column>
      <el-table-column label="挂号科室" prop="department"></el-table-column>
      <el-table-column label="挂号费用（￥）" prop="price"></el-table-column>
      <el-table-column label="挂号医生" prop="doctor"></el-table-column>
      <el-table-column label="状态" prop="status">
        <template #default="{ row }">
          <el-tag v-if="row.status==='待叫号'" type="error">{{row.status}}</el-tag>
          <el-tag v-else-if="row.status==='就诊中'" type="primary">{{row.status}}</el-tag>
          <el-tag v-else-if="row.status==='待住院'" type="warning">{{row.status}}</el-tag>
          <el-tag v-else type="info">{{row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" v-if="userInfo.type==='患者'">
        <template #default="{ row }" >
          <el-button type="text" v-if="row.status==='已结束'||row.status=='待住院'" @click="diagnosis(row)">查看医嘱</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" v-if="userInfo.type==='医生'">
        <template #default="{ row }" >
          <el-button type="warning" v-if="row.status==='待叫号'" @click="callNumber(row.id)">叫号</el-button>
          <el-button type="success" v-if="row.status==='就诊中'" @click="diagnosis(row)">诊断</el-button>
          <el-button type="text" v-if="row.status==='已结束'||row.status=='待住院'" @click="diagnosis(row)">查看医嘱</el-button>

        </template>
      </el-table-column>

    </el-table>
  </el-card>

  <el-dialog v-model="dialogVisible" title="诊断报告" width="500" center>
    <el-descriptions title="个人信息">
      <el-descriptions-item label="患者姓名">
        <el-tag size="large">{{selectedPatient.patient}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="挂号科室">
        <el-tag size="large">{{selectedPatient.department}}</el-tag>

      </el-descriptions-item>
    </el-descriptions>
    <el-form-item label="医嘱详情">
      <el-input type="textarea" v-model="selectedPatient.message" v-if="selectedPatient.status==='已结束'||selectedPatient.status==='待住院'" disabled/>
      <el-input type="textarea" v-model="data.message" v-else/>
    </el-form-item>
    <template #footer>
      <div class="dialog-footer" v-if="selectedPatient.status==='就诊中'">
        <el-button type="success" @click="submit">提交</el-button>
        <el-button type="danger" @click="toHospital">住院</el-button>
      </div>
      <div class="dialog-footer" v-if="selectedPatient.status==='待住院'">
        <el-button type="danger" @click="addHospital">申请住院</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.page-container {
  //min-height: 100%;
  overflow: scroll;
  box-sizing: border-box;
  height: 85vh;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

}


</style>
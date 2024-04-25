<script setup>
import {ref,onMounted} from "vue";
import {
  getAllHospitalService,
  applyForDischargeService,
  agreeDischargeService,
    refuseDischargeService,
    dischargeService
} from '@/apis/hospital.js'
import {rechargeService} from '@/apis/user.js'
import {useUserInfoStore} from "@/stores/useInfo.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {finishService} from "@/apis/appointment.js";
import {InfoFilled} from "@element-plus/icons-vue";
const userInfoStore = useUserInfoStore();
const userInfo = userInfoStore.info
const hospitalList = ref([])
const myHospitalList = ref([])
let dialogVisible = ref(false)
let selectedHospital = ref({})
let cost = ref(0)
const getHospital = async () => {
  let {data} = await getAllHospitalService();
  console.log(data);
  hospitalList.value = data;
  myHospitalList.value = data.filter(item=>item.userId===userInfo.id)
}

//患者申请出院
const applyForDischarge = async (id) => {
  await applyForDischargeService(id)
  await getHospital()
  ElMessage.success("申请成功！")
}
//管理员同意出院
const approveForDischarge = async (row) => {
  selectedHospital.value = row
  dialogVisible.value = true
}
//同意
const agree = async () => {
  ElMessageBox.confirm(
      '您确定要同意患者出院吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }
  )
      .then(async () => {
        await agreeDischargeService({
          id:selectedHospital.value.id,
          cost:cost.value
        })
        await getHospital()
        ElMessage.success("操作成功")
        dialogVisible.value = false
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消出院',
        })
      })
}

//拒绝
const refuse = async () => {
  ElMessageBox.confirm(
      '您确定要拒绝患者出院吗?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
      }
  )
      .then(async () => {
        await refuseDischargeService(selectedHospital.value.id)
        await getHospital()
        ElMessage.success("操作成功")
        dialogVisible.value = false
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消操作',
        })
      })
}
//患者缴费
const confirmDischarge = async (row) => {
  if (userInfo.balance < row.cost) {
    ElMessage.error("您的余额不足，请充值")
  }else {
    await rechargeService(userInfo.id,userInfo.balance-row.cost)
    userInfo.balance -= row.cost
    await dischargeService(row.id)
    await getHospital()
    ElMessage.success("出院成功")
  }
}
onMounted(()=>{
  getHospital()
})
</script>
<template>
  <el-card class="page-container  animate__animated animate__bounceInUp">
    <template #header>
      <div class="header">
        <span>我的住院信息</span>
      </div>
    </template>
    <el-table style="width: 100%" :data="userInfo.type==='患者'?myHospitalList:hospitalList">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column label="住院科室" prop="department" sortable></el-table-column>
      <el-table-column label="住院日期" prop="comeDate" width="200" sortable></el-table-column>
      <el-table-column label="出院日期" prop="leaveDate" width="200" sortable>
        <template #default="{row}">
          <div v-if="row.leaveDate">{{row.leaveDate}}</div>
          <div v-else>住院中......</div>
        </template>
      </el-table-column>
      <el-table-column label="住院费用" prop="cost"></el-table-column>
      <el-table-column label="状态" prop="status" sortable>
        <template #default="{ row }">
          <el-tag v-if="row.status==='住院中'" type="primary">{{row.status}}</el-tag>
          <el-tag v-else-if="row.status==='申请出院中'" type="warning">{{row.status}}</el-tag>
          <el-tag v-else-if="row.status==='待缴费'" type="danger">{{row.status}}</el-tag>

          <el-tag v-else type="info">{{row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" v-if="userInfo.type!=='医生'">
        <template #default="{ row }">
          <el-button type="success"  v-if="userInfo.type==='患者'&&row.status==='住院中'" @click="applyForDischarge(row.id)">申请出院</el-button>
          <el-popconfirm
              v-if="userInfo.type==='患者'&&row.status==='待缴费'"
              confirm-button-text="Yes"
              cancel-button-text="No"
              :icon="InfoFilled"
              icon-color="green"
              title="您确定要缴费吗?"
              @confirm="confirmDischarge(row)"
              @cancel="ElMessage.info('取消缴费')"
          >
            <template #reference>
              <el-button type="primary">缴费</el-button>
            </template>
          </el-popconfirm>


          <el-button type="success"  v-if="userInfo.type==='管理员'" :disabled="row.status!=='申请出院中'" @click="approveForDischarge(row)">出院申请</el-button>

        </template>

      </el-table-column>

    </el-table>
  </el-card>
  <el-dialog v-model="dialogVisible" title="出院申请" width="500" center>
    <el-descriptions title="个人信息">
      <el-descriptions-item label="患者姓名">
        <el-tag size="large">{{selectedHospital.name}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="挂号科室">
        <el-tag size="large">{{selectedHospital.department}}</el-tag>
      </el-descriptions-item>

    </el-descriptions>
    <el-descriptions>
      <el-descriptions-item label="入院时间">
        <el-tag size="large">{{selectedHospital.comeDate}}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions>
      <el-descriptions-item label="代缴费用">
        <el-input type="number" style="width: 100px" v-model.number="cost"></el-input>
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" @click="refuse">拒绝</el-button>
        <el-button type="primary" @click="agree">同意</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="">

</style>
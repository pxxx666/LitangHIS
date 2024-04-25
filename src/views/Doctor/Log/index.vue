<script setup>
import {ref,onMounted} from "vue";
import {doctorListService,addDoctorService} from "@/apis/doctor.js"
import {departmentListService} from '@/apis/department.js'
import {userChangeStatusService} from '@/apis/user.js'
import {ElMessage} from "element-plus";
import {useUserInfoStore} from '@/stores/useInfo.js'
import {useRouter} from "vue-router";
const router = useRouter()
const userInfoStore = useUserInfoStore()
const userInfo = userInfoStore.info
//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数

const visibleDrawer = ref(false)
const week = ref([
  {
    value: '星期一',
    label: '星期一',
  },
  {
    value: '星期二',
    label: '星期二',
  },
  {
    value: '星期三',
    label: '星期三',
  },
  {
    value: '星期四',
    label: '星期四',
  },
  {
    value: '星期五',
    label: '星期五',
  },
  {
    value: '星期六',
    label: '星期六',
  }
])
//医生数据
const doctorList = ref([])

//获取科室信息
const departmentList = ref([])
const getDepartmentList = async () => {
  const {data} = await departmentListService()
  departmentList.value = data
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
}
const getDoctorList = async () => {
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    type: '医生'
  }
  const {data} = await doctorListService(params)
  total.value = data.total
  doctorList.value = data.items
}
const formData = ref({
  birth:'',
  sex:'',
  department:'',
  price:1,
  count:1,
  position:'',
  schedule:[],
  description:''
})
//判断是否包含空对象
function hasEmptyProperty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] === null || obj[key] === undefined || obj[key] === '')) {
      return true;
    }
  }
  return false;
}

const doctor = ref({})
const logDoctor = (row) => {
  doctor.value = {
    userId:row.id,
  }
  visibleDrawer.value = true
}
const submit = async () => {
  Object.assign(doctor.value,formData.value)
  if(!hasEmptyProperty(doctor.value)){
    doctor.value.birth = new Date(doctor.value.birth.toString()).toISOString().slice(0,10)
    doctor.value.schedule = JSON.stringify(doctor.value.schedule)
    await addDoctorService(doctor.value)
    await userChangeStatusService(doctor.value.userId)
    await getDoctorList()
    visibleDrawer.value = false
    ElMessage.success('录入信息成功')
    doctor.value = {}
    formData.value = {
      birth:'',
      sex:'',
      department:'',
      price:1,
      count:1,
      position:'',
      schedule:[],
      description:''
    }
  }else {
    ElMessage.error("请完善表中所有内容")
  }


}
onMounted(() =>{
  if(userInfo.type !== '管理员'){
    router.push('/403')
  }else {
    getDoctorList()
    getDepartmentList()
  }


})

</script>

<template>
  <el-card class="page-container  animate__animated animate__bounceInUp">
    <template #header>
      <div class="header">
        <span>医生信息管理</span>
      </div>
    </template>
    <el-table  :data="doctorList" style="width: 100%">
      <el-table-column label="医生编号" prop="id"></el-table-column>
      <el-table-column label="医生姓名" prop="trueName"></el-table-column>

      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="primary" plain @click="logDoctor(row)">录入信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页条 -->
    <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[10]"
                   layout="jumper, total, sizes, prev, pager, next" background :total="total"
                   @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
  </el-card>

  <el-drawer v-model="visibleDrawer"  direction="rtl" size="35%">
    <el-form  label-width="100px">
      <el-form-item label="出生日期">
        <el-date-picker
            v-model="formData.birth"
            type="dates"
            placeholder="请选择出生日期"
            clearable
        />
      </el-form-item>
      <el-form-item  label="性别">
        <el-radio-group size="large" v-model="formData.sex">
          <el-radio-button label="男" value="男" />
          <el-radio-button label="女" value="女" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="科室">
        <el-select
            v-model="formData.department"
            placeholder="请选择科室"
            clearable
        >
          <el-option v-for="item in departmentList" :label="item.name" :value="item.name"/>
        </el-select>
      </el-form-item>
      <el-form-item  label="职位">
        <el-radio-group size="large" v-model="formData.position">
          <el-radio-button label="主治医师" value="主治医师" />
          <el-radio-button label="正主任医师" value="正主任医师" />
          <el-radio-button label="副主任医师" value="副主任医师" />
          <el-radio-button label="名师专家" value="名师专家" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="就诊人数" >
        <el-input-number v-model="formData.count"></el-input-number>
      </el-form-item>
      <el-form-item label="就诊金额" >
        <el-input-number v-model="formData.price"></el-input-number>
      </el-form-item>
      <el-form-item label="排班时间" >
        <el-select
            v-model="formData.schedule"
            multiple
            placeholder="请选择排班时间"
            style="width: 240px"
        >
          <el-option
              v-for="item in week"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="医生介绍" >
        <el-input v-model="formData.description" type="textarea" :autosize="{ minRows: 2, maxRows: 8 }" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
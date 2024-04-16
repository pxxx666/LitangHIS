<script setup>
import {ref,onMounted,computed} from "vue";
import {doctorListByPageService} from "@/apis/doctor.js"
import {departmentListService} from '@/apis/department.js'
import {ElMessage} from "element-plus";
//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(10)//每页条数
const selectedDepartment = ref("")
const selectedPosition = ref("")

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
//获取医生列表
const getDoctorList = async () => {
  let params = {
    pageNum:pageNum.value,
    pageSize:pageSize.value,
    department:selectedDepartment.value?selectedDepartment.value:null,
    position:selectedPosition.value?selectedPosition.value:null
  }
  const {data} = await doctorListByPageService(params)
  doctorList.value = data.items
  total.value = data.total
}
//处理排版时间
const handleSchedule = (schedule)=>{
  let str = ''
  const scheduleArr = JSON.parse(schedule)
  scheduleArr.forEach((item,index)=>{
    if(index !== 0){
      str += ','+item
    }else {
      str += item
    }
  })
  return str
}
//处理生日为年龄
const handleAge = (birth)=>{
  const date = new Date()
  const year = date.getFullYear()
  return year - birth.slice(0,4)
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
  getDoctorList()
}
//重置表单
const reset = () => {
  selectedPosition.value=''
  selectedDepartment.value=''
}
//点击修改弹出
const update = () => {
  visibleDrawer.value = true
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


onMounted(() =>{
  getDepartmentList()
  getDoctorList()
})

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>医生信息管理</span>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item label="科室：">
        <el-select placeholder="请选择" v-model="selectedDepartment">
          <el-option v-for="item in departmentList" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职位：">
        <el-select placeholder="请选择" v-model="selectedPosition">
          <el-option label="主治医师" value="主治医师"></el-option>
          <el-option label="正主任医师" value="正主任医师"></el-option>
          <el-option label="副主任医师" value="副主任医师"></el-option>
          <el-option label="名师专家" value="名师专家"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getDoctorList">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table  :data="doctorList" stripe style="width: 100%">
      <el-table-column label="序号"  width="100" type="index"> </el-table-column>
      <el-table-column label="姓名" sortable prop="trueName"></el-table-column>
      <el-table-column label="性别" sortable prop="sex"></el-table-column>
      <el-table-column label="年龄" sortable prop="birth">
        <template #default="{ row }">
          <div>{{ handleAge(row.birth) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="所在科室" sortable prop="department"></el-table-column>
      <el-table-column label="职位" sortable prop="position"></el-table-column>
      <el-table-column label="排班时间" sortable prop="schedule">
        <template #default="{ row }">
          <div>{{ handleSchedule(row.schedule) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="就诊人数" sortable prop="count"></el-table-column>
      <el-table-column label="价格" sortable prop="price"></el-table-column>


      <el-table-column label="操作" width="200px">
        <template #default="{ row }">
          <el-button type="warning" plain @click="update">修改</el-button>
          <el-button type="danger" plain>移除</el-button>
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
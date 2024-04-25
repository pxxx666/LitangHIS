<script setup>
import { ref,onMounted,provide} from 'vue'
import MyCard from "@/components/MyCard.vue";
import {getListAllService} from '@/apis/doctor.js'
import {departmentListService} from '@/apis/department.js'
import {getTodayWeekday} from '@/utils/today.js'
import {useUserInfoStore} from "@/stores/useInfo.js";
const userInfoStore = useUserInfoStore()
const userInfo = userInfoStore.info
let doctorList = ref([])
let departmentList = ref([])
let renderDoctorList = ref([])
let selectedDepartment = ref('')
let today = getTodayWeekday()


const getDoctorList = async () => {
  let {data}  = await  getListAllService()
  doctorList.value = data.filter(item=>item.schedule.includes(today))
  renderDoctorList.value = doctorList.value
}
const getDepartmentList = async () => {
  let {data} = await departmentListService()
  departmentList.value = data
}

const reset = () => {
  getDoctorList()
  selectedDepartment.value = ''
}

const search = () => {
  renderDoctorList.value = doctorList.value.filter(item=>item.department === selectedDepartment.value)
}


onMounted(()=>{
  getDoctorList()
  getDepartmentList()
})
</script>
<template>
  <el-card class="page-container animate__animated animate__bounceInUp">
    <template #header>
      <div class="header">
        <span>预约医生</span>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item label="科室：">
        <el-select placeholder="请选择" v-model="selectedDepartment">
          <el-option v-for="item in departmentList" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="search" type="primary">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>


    <!-- 表格 -->
    <el-container>
      <my-card v-for="item in renderDoctorList" :info="item"></my-card>
    </el-container>



  </el-card>
</template>
<style lang="scss" scoped>
.page-container {
  height: 85vh;
  box-sizing: border-box;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.el-container{
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  overflow: scroll;
  height: 680px;
  border: 1px solid #ccc;
  padding: 5px;
}
</style>
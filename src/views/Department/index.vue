<script setup>
import {ref,onMounted} from "vue";
import {Delete, Edit} from "@element-plus/icons-vue";
import {departmentListService,departmentDetailService,removeDepartmentService,addDepartmentService,updateDepartmentService} from '@/apis/department.js'
import {ElMessage,ElMessageBox} from "element-plus";
import {useUserInfoStore} from '@/stores/useInfo.js'
import {useRouter} from "vue-router";
const router = useRouter()
const userInfoStore = useUserInfoStore()
const userInfo = userInfoStore.info
//弹窗
let dialogFormVisible = ref(false)
const departmentList = ref([])
const departmentModel = ref({
  id: 0,
  name: '',
  description: ''
})
//获取所有科室信息
const getDepartmentList = async () => {
  const {data} = await departmentListService()
  departmentList.value = data
}
const title = ref('')
//重置表单
const resetForm = () => {
  departmentModel.value = {
    id:0,
    name:'',
    description:''
  }
}

//添加科室
const addDepartment = async () => {
  const result = await addDepartmentService(departmentModel.value)
  dialogFormVisible.value = false
  ElMessage.success('添加成功')
  await getDepartmentList()
}
const  updateDepartment = async (row) => {
  dialogFormVisible.value = true
  title.value = '修改科室'
  departmentModel.value = row

}

//确定按钮提交
const submit = async () =>{
  if(title.value==='添加科室'){
    if (departmentModel.value.name !== ''){
      await addDepartment()
    }else {
      ElMessage.error('科室名称不能为空')
    }
  }else{
    if(departmentModel.value.name !== ''){
      const result = await updateDepartmentService(departmentModel.value)
      if(result.code===0){
        ElMessage.success('修改成功')
        await getDepartmentList()
        dialogFormVisible.value = false
      }
    }
  }
}
//删除科室
const deleteDepartment = async (row) => {
  ElMessageBox.confirm(
      '您确定要删除该吗?',
      '温馨提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  ).then(async () => {
    const result = await removeDepartmentService(row.id)
    if(result.code == 0){
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      await getDepartmentList()
    }
  })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })

}

onMounted(()=>{
  if(userInfo.type !== '管理员'){
    router.push('403')
  }else {
    getDepartmentList()

  }
})


</script>

<template>
  <el-card class="page-container  animate__animated animate__bounceInUp">
    <template #header>
      <div class="header">
        <span>科室信息管理</span>
        <div class="extra">
          <el-button type="primary" plain @click="dialogFormVisible = true;title='添加科室';resetForm()">添加科室</el-button>
        </div>
      </div>
    </template>
    <el-table :data="departmentList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="科室名称" prop="name"></el-table-column>
      <el-table-column label="科室描述" prop="description">

          <template #default="{ row }">
              <div class="ellipsis-text" :title="row.description">{{ row.description }}</div>
          </template>


      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template #default="{ row }">
          <el-button plain type="warning" @click="updateDepartment(row)">更新科室</el-button>
          <el-button plain type="danger" @click="deleteDepartment(row)">删除科室</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 添加分类弹窗 -->
  <el-dialog v-model="dialogFormVisible" :title="title" width="30%">
    <el-form :model="departmentModel" label-width="100px" style="padding-right: 30px">
      <el-form-item label="科室名称" prop="name">
        <el-input v-model="departmentModel.name"></el-input>
      </el-form-item>
      <el-form-item label="科室描述" prop="description">
        <el-input v-model="departmentModel.description" type="textarea" :autosize="{ minRows: 2, maxRows: 8 }" />
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submit"> 确认 </el-button>
            </span>
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

  /* 定义超出部分以省略号显示 */
  .ellipsis-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%; /* 需要设置一个宽度以限制文字显示范围 */
    max-width: 200px; /* 可根据实际情况调整最大宽度，这里只是一个示例 */
  }
}


</style>
<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'

import { ref } from 'vue'
import MyCard from "@/components/MyCard.vue";


//分页条数据模型
const pageNum = ref(1)//当前页
const total = ref(20)//总条数
const pageSize = ref(3)//每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
  pageSize.value = size
}
//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
  pageNum.value = num
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>预约医生</span>
      </div>
    </template>
    <!-- 搜索表单 -->
    <el-form inline>
      <el-form-item label="科室：">
        <el-select placeholder="请选择">
          <el-option label="妇产科" value="妇产科"></el-option>
          <el-option label="心内科" value="心内科"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="职位：">
        <el-select placeholder="请选择">
          <el-option label="名医专家" value="名医专家"></el-option>
          <el-option label="主任医生" value="主任医生"></el-option>
          <el-option label="副主任医生" value="副主任医生"></el-option>
          <el-option label="主治医生" value="主治医师"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>


    <!-- 表格 -->
    <el-container>
      <my-card v-for="i in 25"></my-card>
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
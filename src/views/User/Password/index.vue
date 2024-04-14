<script setup>
  import { ref } from 'vue';
  import { ElMessageBox, ElMessage } from 'element-plus'
  import {userUpdatePasswordService} from '@/apis/user.js'
  import {useRouter} from 'vue-router'
  const router = useRouter()
  const resetPasswordData = ref({
    old_password: "",
    new_password: "",
    re_password: ""
  })
  const rePasswordValid = (rule, value, callback) => {
    if (value == null || value === '') {
      return callback(new Error('请再次确认密码'))
    }
    if (resetPasswordData.value.new_password !== value) {
      return callback(new Error('两次输入密码不一致'))
    }
  }
  const resetPasswordDataRules = ref({
    old_password: [
      { required: true, message: '请输入原密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度必须为6~20位', trigger: 'blur' }
    ],
    new_password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度必须为6~20位', trigger: 'blur' }
    ],
    re_password: [
      { validator: rePasswordValid, trigger: 'blur' }
    ]
  })

  const resetPassword = async () => {
    ElMessageBox.confirm(
        '您确定要修改用户密码吗?',
        'Warning',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
        .then(async () => {
          let result = await userUpdatePasswordService(resetPasswordData.value)
          if (result.code == 0) {
            ElMessage({
              type: 'success',
              message: '成功修改,请重新登录',
              plain:true
            })
            router.push('/login')
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消修改',
          })
        })
  }
</script>
<template>
  <el-card>
    <template #header>
      <div class="header">
        <span>重置密码</span>
      </div>
    </template>
    <el-row>
      <el-col :span="10" :offset="6">
        <el-form  label-width="100px" size="large" :rules="resetPasswordDataRules" :model="resetPasswordData">
          <el-form-item label="原密码">
            <el-input v-model="resetPasswordData.old_password"  type="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码" >
            <el-input v-model="resetPasswordData.new_password" label="新密码" show-password ></el-input>
          </el-form-item>
          <el-form-item label="确定密码">
            <el-input v-model="resetPasswordData.re_password" label="确定密码" show-password ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain style="width: 500px" @click="resetPassword">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

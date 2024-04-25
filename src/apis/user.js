import request from '@/utils/request.js'
export const userRegisterService = (registerData) => {
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key, registerData[key])
    }
    return request.post("/user/register", params)
}
export const userLoginService = (loginData) => {
    const params = new URLSearchParams()
    for (let key in loginData) {
        params.append(key, loginData[key])
    }
    return request.post("/user/login", params)
}

//获取用户个人信息
export const userInfoService = () => {
    return request.get('/user/userInfo')
}

//更新用户密码
export const userUpdatePasswordService = (passwordData) => {
    return request.patch('/user/updatePwd', passwordData)
}

//更换用户基本信息
export const userUpdateInfoService = (infoData) => {
    return request.put('/user/update', infoData)
}

//改变医生录入为2状态（已录入）
export const userChangeStatusService = (id) => {
    return request.patch('/user/updateStatus?id='+id)
}
//改变医生录入为1状态（待录入）
export const userChangeStatus1Service = (id) => {
    return request.patch('/user/updateStatus1?id='+id)
}
//改变医生录入为3状态（已删除）
export const userChangeStatus3Service = (id) => {

    return request.patch('/user/updateStatus3?id='+id)
}

//充值金额
export const rechargeService = (id,balance) => {
    return request.put('/user/recharge?id='+id+'&balance='+balance)
}
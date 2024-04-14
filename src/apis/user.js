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
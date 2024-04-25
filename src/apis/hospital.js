import request from '@/utils/request.js'
export const addToHospitalService = (data) => {
    return request.post('/hospital',data)
}

export const getAllHospitalService = () => {
    return request.get("/hospital")
}

//患者申请出院接口
export const applyForDischargeService = (id) => {
    return request.patch("/hospital/apply?id="+id)
}

//管理员同意申请
export const agreeDischargeService = (data) => {
    const params = new URLSearchParams()
    for (let key in data) {
        params.append(key, data[key])
    }
    return request.patch("/hospital/pay",params)
}

//管理员拒绝申请
export const refuseDischargeService = (id) => {
    return request.patch("/hospital/refuse?id="+id)
}
//出院
export const dischargeService = (id) => {
    return request.patch("/hospital/discharge?id="+id)
}
import request from "@/utils/request.js";
export const doctorListService = (params) => {
    return request.get('/user/list', { params: params })
}

export const addDoctorService = (data) => {
    return request.post("/doctor", data)
}

export const doctorListByPageService = (params)=>{
    console.log(params)
    return request.get('/doctor/page',{params:params})
}
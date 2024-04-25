import request from "@/utils/request.js";
export const doctorListService = (params) => {
    return request.get('/user/list', { params: params })
}

export const addDoctorService = (data) => {
    return request.post("/doctor", data)
}

export const doctorListByPageService = (params)=>{
    return request.get('/doctor/page',{params:params})
}
export const updateDoctorService = (data)=>{
    return request.put("/doctor",data)
}

export const deleteDoctorService = (doctorId)=>{
    return request.delete("/doctor?doctorId="+doctorId)
}
export const getListAllService = ()=>{
    return request.get("/doctor")
}
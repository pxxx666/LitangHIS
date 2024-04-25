import request from "@/utils/request.js";
export const addAppointmentService = (data) => {
    return request.post("/appointment",data)
}
export const appointmentListService = () => {
    return request.get("/appointment")
}

export const callNumberService = (id) => {
    return request.patch("/appointment/callNumber?id="+id)
}

export const diagnosisService = (data) => {
    const params = new URLSearchParams()
    for (let key in data) {
        params.append(key, data[key])
    }
    return request.patch("/appointment/end",params)
}

export const hospitalService = (data) => {
    const params = new URLSearchParams()
    for (let key in data) {
        params.append(key, data[key])
    }
    return request.patch("/appointment/toHospital",params)
}

export const finishService = (id) => {
    return request.patch("/appointment/finish?id="+id)
}
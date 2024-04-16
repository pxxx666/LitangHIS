import request from "@/utils/request.js";
export const departmentListService = () => {
    return request.get('/department')
}

export const addDepartmentService = (data) => {
    return request.post('/department', data)
}

export const removeDepartmentService = (id) => {
    return request.delete('/department?id=' + id)
}
export const departmentDetailService = (id) => {
    return request.get('/department/?id='+id)
}

export const updateDepartmentService = (data) => {
    return request.put('/department', data)
}
import request from "@/utils/request.js";
export const getUserTotalService = () => {
    return request.get("/statistics/user")
}

export const getDepartmentTotalService = () => {
    return request.get("/statistics/department")
}
export const getPositionTotalService = () => {
    return request.get("/statistics/position")
}
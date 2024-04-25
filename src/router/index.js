import { createRouter, createWebHistory } from 'vue-router'
import Appoint from '@/views/Appoint/index.vue'
import Recharge from '@/views/Recharge/index.vue'
import Hospital from '@/views/Hospital/index.vue'
import UserProfile from '@/views/User/Profile/index.vue'
import UserPassword from '@/views/User/Password/index.vue'
import Echarts from '@/views/Echarts/index.vue'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import DoctorLog from '@/views/Doctor/Log/index.vue'
import DoctorProfile from '@/views/Doctor/Profile/index.vue'
import Department from '@/views/Department/index.vue'
import Error from '@/views/403/index.vue'
import MyAppointment from '@/views/MyAppointment/index.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/login',
            component:Login
        },
        {
            path:'/',
            component:Layout,
            redirect:'/echarts',
            children:[
                {
                    path: '/appoint',
                    component: Appoint
                },
                {
                    path:'/myAppointment',
                    component:MyAppointment
                },
                {
                    path: '/hospital',
                    component: Hospital
                },
                {
                    path: '/recharge',
                    component: Recharge
                },
                {
                    path: '/user/profile',
                    component: UserProfile
                },
                {
                    path: '/user/password',
                    component: UserPassword
                },
                {
                  path:'/doctor/log',
                  component: DoctorLog
                },
                {
                  path:'/doctor/profile',
                  component:DoctorProfile
                },
                {
                    path: '/echarts',
                    component: Echarts
                },
                {
                    path:'/department',
                    component:Department
                },
                {
                    path:'/403',
                    component:Error
                }
            ]
        }
    ]
})
export default router
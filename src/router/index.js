import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/login',
            component:()=>import('@/views/Login/index.vue')
        },
        {
            path:'/',
            component:()=>import('@/views/Layout/index.vue'),
            redirect:'/echarts',
            children:[
                {
                    path: '/appoint',
                    component: ()=>import('@/views/Appoint/index.vue')
                },
                {
                    path:'/myAppointment',
                    component:()=>import('@/views/MyAppointment/index.vue')
                },
                {
                    path: '/hospital',
                    component: ()=>import('@/views/Hospital/index.vue')
                },
                {
                    path: '/recharge',
                    component: ()=>import('@/views/Recharge/index.vue')
                },
                {
                    path: '/user/profile',
                    component: ()=>import('@/views/User/Profile/index.vue')
                },
                {
                    path: '/user/password',
                    component: ()=>import('@/views/User/Password/index.vue')
                },
                {
                  path:'/doctor/log',
                  component: ()=>import('@/views/Doctor/Log/index.vue')
                },
                {
                  path:'/doctor/profile',
                  component:()=>import('@/views/Doctor/Profile/index.vue')
                },
                {
                    path: '/echarts',
                    component: ()=>import('@/views/Echarts/index.vue')
                },
                {
                    path:'/department',
                    component:()=>import('@/views/Department/index.vue')
                },
                {
                    path:'/403',
                    component:()=>import('@/views/403/index.vue')
                }
            ]
        }
    ]
})
export default router
import { createRouter, createWebHistory } from 'vue-router'
import Appoint from '@/views/Appoint/index.vue'
import Recharge from '@/views/Recharge/index.vue'
import Hospital from '@/views/Hospital/index.vue'
import UserAtavar from '@/views/UserAtavar/index.vue'
import UserInfo from '@/views/UserInfo/index.vue'
import Echarts from '@/views/Echarts/index.vue'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
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
            redirect:'/appoint',
            children:[
                {
                    path: '/appoint',
                    component: Appoint
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
                    path: '/userAtavar',
                    component: UserAtavar
                },
                {
                    path: '/userInfo',
                    component: UserInfo
                },
                {
                    path: '/echarts',
                    component: Echarts
                }
            ]
        }
    ]
})
export default router
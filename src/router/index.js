import { createRouter, createWebHistory } from 'vue-router'
import Appoint from '@/views/Appoint/index.vue'
import Recharge from '@/views/Recharge/index.vue'
import Hospital from '@/views/Hospital/index.vue'
import UserProfile from '@/views/User/Profile/index.vue'
import UserPassword from '@/views/User/Password/index.vue'
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
                    path: '/user/profile',
                    component: UserProfile
                },
                {
                    path: '/user/password',
                    component: UserPassword
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
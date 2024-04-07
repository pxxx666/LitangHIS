// 导入axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
// 导入token状态
import { useTokenStore } from '@/stores/token.js';

const baseURL = '/api';
const instance = axios.create({ baseURL });
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做什么
        let tokenStore = useTokenStore();
        // 如果token中有值，在请求头中携带
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token;
        }
        return config;
    },
    (err) => {
        // 如果请求错误做什么
        Promise.reject(err);
    }
);
// 添加响应拦截器
import router from '@/router';
instance.interceptors.response.use(
    result => {
        if (result.data.code !== 0) {
            ElMessage.error(result.data.message ? result.data.message : "服务异常");
        }
        return result.data
    },
    err => {
        if (err.response && err.response.status === 401) {
            ElMessage.error('请先登录！');
            // 路由跳转到登录页
            router.push('/login')
        } else {
            ElMessage.error('服务异常！');
        }
        return Promise.reject(err);
    }
);



export default instance;
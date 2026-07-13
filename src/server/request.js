import axios from 'axios'
const request = axios.create({
    // baseURL: '/server',
    timeout: 5000,
})


// 添加请求拦截器
request.interceptors.request.use(function (config) {
    const token = localStorage.getItem('adminToken')
    console.log('token', token)
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    // 在发送请求之前做些什么
    // console.log('请求拦截:',config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // console.log('响应拦截:',response)
    const res = response.data
    console.log('response>>>',response)
    // 对响应数据做点什么
    if(response.status == 200 || response.status == 201) {
        return Promise.resolve(res);
    }
}, function (error) {
    const err = error.response
    console.log('拦截器错误',err.data)
    // 对响应错误做点什么
    return Promise.reject(err.data);
});

export default request

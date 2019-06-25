/**
 * @description apiCover全局配置
 */
export default {
    baseURL: window.location.origin,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    // withCredentials: true, //浏览器请求带上cookie，用于后台session验证
    // timeout: 7000
}
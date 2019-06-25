/**
 * @author AlanChen
 * @module CheckLoginAccess 检测登录时效
 * @param {Date} loginTime 登录时间的Date对象 
 * @param {Number} interval 有效周期，单位是毫秒
 * @returns {Promise} then表示登录有效，catch表示登录过期。均带有当前Date日期对象作为返回参数
 * 
 */
const CheckLoginAccess = (loginTime,interval) => {
    const nowTime = new Date()*1
    return new Promise((resolve,reject) => {
        if(nowTime - loginTime*1 >= interval){
            reject(new Date(nowTime))
        }else{
            resolve(new Date(nowTime))
        }
    })
}
export default CheckLoginAccess
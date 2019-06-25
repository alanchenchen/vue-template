/**
 * @author AlanChen
 * @module RegExpRule 正则判断的模块
 * @method isIP 判断传入字符串是否为合法ip地址
 * @method isFullIP 判断传入字符串是否为以斜杠拼接0-32掩码的合法ip地址
 * @method isMacAddress 判断传入字符串是否为以冒号拼接的合法mac地址
 * @method isPort 判断传入字符串是否为合法端口号
 * @method isEmail 判断传入字符串是否为邮箱地址
 * @method isVlanId 校验是否为VLANID
 * @method isMask 校验是否为子网掩码
 * @method isNeighborAS 校验是否为邻居AS
 * @method isEqualIPAddress 校验是否在同一网段
 */
export default {
    isIP(str) {
        return /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/.test(str)
    },
    isFullIP(str) {
        return /^(([01]?\d?\d|2[0-4]\d|25[0-5])\.){3}([01]?\d?\d|2[0-4]\d|25[0-5])\/(\d{1}|[0-2]{1}\d{1}|3[0-2])$/.test(str)
    },
    isMacAddress(str) {
        return /^([a-f0-9]{2}:){5}[a-f0-9]{2}$/i.test(str)
    },
    isPort(str) {
        return checkRange(str, 0, 65535);
    },
    isEmail(str) {
        return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str)
    },
    isVlanId(str) {
        return checkRange(str, 2, 4094);
    },
    isMask(str){
        return checkRange(str, 0, 32);
    },
    isNeighborAS(str){
        return checkRange(str, 1, 65535);
    },
    /**
     * 校验是否在同一网段
     * @param {*} addr1 IP地址1
     * @param {*} addr2 IP地址2
     * @param {*} mask 子网掩码，范围为0-32
     */
    isEqualIPAddress (addr1, addr2, mask){
        if(!addr1 || !addr2 || !mask){
            return false;
        }
        var res1 = [], res2 = [];
     
        addr1 = addr1.split(".");
        addr2 = addr2.split(".");
        let o="00000000"
        for(var i = 0,ilen = addr1.length; i < ilen ; i += 1){
            let num1 = parseInt(addr1[i]).toString("2")
            if(num1.length!=8){
                let site=8-num1.length
                num1 = o.slice(0,site)+num1
            }
            let num2 = parseInt(addr2[i]).toString("2")
            if(num2.length!=8){
                let site=8-num2.length
                num2 = o.slice(0,site)+num2
            }
            res1.push(num1);
            res2.push(num2);
        }
        if(res1.join("").slice(0,parseInt(mask)) == res2.join("").slice(0,parseInt(mask))){
            return true;
        }
        return false;
    },
    checkRange
}
function checkRange(str, min, max) {
    if(Number.isInteger(str)) {
        return str >= min && str <= max
    }
    else if(typeof str == 'string' && Boolean(str.trim())) {
        const port = Number.parseFloat(str)
        return Number.isInteger(port) && port >= min && port <= max
    }
    return false
}
/**
 * @author AlanChen
 * @module storage 操作本地存储sessionStorage
 * @method set 接受一个参数为object，会自动遍历存入所对应的键值对,接受两个参数则为string，设置单个键值对
 * @method get 接受一个string，会取出对应的key的value值
 * @method remove 接受一个string，会删除对应的key的value值
 * @method clear 不传参，清除所有存储
 */

export default {
    set(...item) {
        if(item.length==2) {
            window.sessionStorage.setItem(item[0],item[1])
        }
        else {
            const entries = Object.entries(item[0])
            entries.forEach(a => {
                window.sessionStorage.setItem(a[0],a[1])
            })
        }
    },
    get(item) {
        return window.sessionStorage.getItem(item)
    },
    remove(item) {
        window.sessionStorage.removeItem(item)
    },
    clear() {
        window.sessionStorage.clear()
    }
}
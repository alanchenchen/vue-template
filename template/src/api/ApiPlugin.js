/**
 * @author AlanChen
 * @class Plugins 安装api插件模块的加载器
 * @constructor 构造器无参数
 * @static install  类的静态方法,参数为一个对象或数组，数组项对象必须包含name，success,error键，可选autoExecute
 * 
 * 1. 安装api插件模块的加载器,默认导出Plugin类
 * 2. 必须先调用静态方法install，一个参数
 * 3. 然后生成实例，调用原型对象的data属性即可获取所有插件模块的内容
 */
export default class Plugins {
    static install(item) { //直接调用class的静态方法，将数据绑定在实例的原型对象上
        if(Array.isArray(item)) {
            this.prototype.data = [...this.prototype.data, ...item]
        }
        else if(item instanceof Object) {
            this.prototype.data.push(item)
        }
        else if(!item) {
            throw new Error(`Type Error! The param is not a string or an array.
                    参数出错，参数不是字符串或者数组`)
        }
    }
}
Plugins.prototype.data = []
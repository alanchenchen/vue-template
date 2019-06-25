/**
 * @description store模块例子
 */
export default {
    namespaced: true,
    state: {
        validStatus: false, // 验证当前模块state某些key值是否存在,只能在checkDataValid调用commit之后才能查看
        policyName: '',
        policyDesc: '',
        appList: [],
        siteList: [],
        policyType: '',
        QosPolicy: {
            active: false,
            cir: 0,
            pir: 0,
        },
        IntelligentPolicy: {
            active: false,
            calculateRules: 'BANDWIDTH',
            bandwidth: 0,
            delay: 0,
            pkLoss: 0
        },
        // ReloadPolicy: false,
        BlockPolicy: {
            active: false
        }
    },
    mutations: {
        /**
         * 缓存数据，合并state和payload的数据
         * @param {Object} state 
         * @param {Object} payload 必须是object，而且key是state中存在的。
         */
        cacheData(state, payload) {
            for(let key of Object.keys(payload)) {
                state[key] = payload[key]
            }
            state.validStatus = false
        },
        /**
         * 清除state的所有数据，恢复至默认值
         * @param {Object} state 
         */
        clearCache(state) {
            for(let key of Object.keys(state)) {
                let val = state[key]
                if(typeof val == 'string') {
                    state[key] = '' 
                }
                else if(typeof val == 'number') {
                    state[key] = 0
                }
                else if(typeof val == 'boolean') {
                    state[key] = false
                }
                else if(Array.isArray(val)) {
                    state[key] = []
                }
                else if(Object.prototype.toString.call(val) == '[object Object]') {
                    for(let subKey of Object.keys(val)) {
                        const subVal = val[subKey]
                        if(typeof subVal == 'string') {
                            state[key][subKey] = '' 
                        }
                        else if(typeof subVal == 'number') {
                            state[key][subKey] = 0
                        }
                        else if(typeof subVal == 'boolean') {
                            state[key][subKey] = false
                        }
                    }
                }
            }
        },
        /**
         * 检查state的对应key值是否存在
         * @param {Object} state 
         * @param {String | Array} payload 可以是单个string或多个string的数组，key必须是state中存在的。
         */
        checkDataValid(state, payload) {
            const type = Object.prototype.toString.call(payload)
            const check = (val) => {
                if(typeof val == 'string') {
                    return val.trim() !== ''
                } else if(Array.isArray(val)) {
                    return val.length >= 1 && val.every(a => Boolean(a))
                } else if(Object.prototype.toString.call(val) == '[object Object]') {
                    return Object.values(val).every(item => Boolean(item))
                }
            }

            switch(type) {
                case '[object String]': 
                    const val = state[payload]
                    state.validStatus =  check(val)
                    break
                case '[object Array]': 
                    state.validStatus =  payload.every((item) => {
                        const val = state[item]
                        return check(val)
                    })
                    break
                default:
                    throw new Error('argument must be a string or an array')
            }
        }
    }
}
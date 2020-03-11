/**
 * Created by en20 on 2019/7/29.
 *
 * 这个页面的函数都会挂载到全局,如果 eslint 报 not defined 只需在页面引入即可
 */

import Toast from 'react-native-root-toast'
import {Alert, NativeModules} from 'react-native'
// 引入存储工具
import './storage'

const TOASP_POSITION = 100
let toast = null
export function $warn(text = '警告', duration = 1500) {
    if (toast !== null) {
        Toast.hide(toast)
    }
    toast = Toast.show(text, {
        // duration: Toast.durations.LONG,
        position: TOASP_POSITION,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        duration,
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // calls on toast\`s hide animation end.
        },
    })
}

export function $confirm(text = '警告', title = '提示') {
    return new Promise((resolve, reject) => {
        Alert.alert(title, text, [
            {text: '取消', onPress: reject, style: 'cancel'},
            {text: '确定', onPress: resolve},
        ])
    })
}

// 根据 value 从对象里找到 key
export const findKey = (value, obj, compare = (a, b) => a === b) => {
    return Object.keys(obj).find(k => compare(obj[k], value))
}

/**
 * 识别开发环境是否是debug开发环境,没有放到 utils.js 避免循环引用
 */
export function identifyDebugDevelopmentEnvironment() {
    const {scriptURL} = NativeModules.SourceCode
    const devEvn = scriptURL.split('&')[1]
    return devEvn === 'dev=true'
}

// 生成随机 id,id 命名规范要求不能包含数字
export const createId = (length = 6) => {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        )
    }
    return result
}

// 根据环境直接返回正常的 log 函数,而不是每次都进来判断
let log = function() {}
if (identifyDebugDevelopmentEnvironment()) {
    log = function(...obj) {
        console.log('global.log: ', obj)
        Toast.show(JSON.stringify(obj), {
            duration: 60000,
            position: TOASP_POSITION,
        })
    }
}
// window.log = log;

// 任意图片 140*140: https://placeimg.com/140/140/any
// 生成图片 宽*高/背景/前景.png/&text=文本: https://dummyimage.com/600x400/ccc/000.png&text=文本

// 正方形 116*116: https://i.loli.net/2019/10/16/PNlcn1Cat8pXwYZ.jpg
// 正方形 212*212: https://tse3-mm.cn.bing.net/th?id=OIP.QNGmLsUJkqUpgMbYBMpPqQAAAA&w=212&h=212&c=7&o=5&dpr=1.25&pid=1.7
// 圆形 118*118: https://i.loli.net/2019/07/17/5d2f08f66f80754766.png
// 正方形 白底: https://img.yzcdn.cn/vant/apple-2.jpg
// 1080p: https://cn.bing.com/th?id=OHR.LeavesGoldfish_ZH-CN6109097460_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp
// 默认头像 蜡笔小新
export const defaultAvatar =
    'http://dymak-app.oss-cn-hongkong.aliyuncs.com/uploads/20200211/07b18e07922d8ecefe062c0b3aa8046e.jpg'
// export const defaultAvatar =
//   'https://tse3-mm.cn.bing.net/th?id=OIP.QNGmLsUJkqUpgMbYBMpPqQAAAA&w=212&h=212&c=7&o=5&dpr=1.25&pid=1.7'
global.defaultProductBanner =
    'https://i.loli.net/2019/07/31/5d4148eee243824369.png'
export function randomAvatarUrl() {
    return 'https://placeimg.com/120/120/any?n=' + Math.random()
}
let $error = $warn,
    $success = $warn
export {log, $error, $success}

import {Linking, NativeModules} from 'react-native'
//  vipLevel 转文字
// 会员等级：0不是会员，1是vip，2是代理商，3是高级代理商，4是总代理
import {BASE_URL} from '../api/apiConfig'
import {$error, $warn} from './globalFunc'

/**
 * 上传图片
 * @param response,'react-native-image-picker' 回调的参数
 */
export function uploadImg(response) {
    return new Promise((resolve, reject) => {
        // 上传图片
        let formData = new FormData()
        formData.append('file', {
            uri: response.uri,
            type: 'application/octet-stream',
            name: response.fileName || 'pic.jpg',
        })
        // console.log(formData);
        fetch(`${BASE_URL}/mobile/common/upload`, {
            // fetch(`http://app.piggyplaygo.com/Common/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; charset=UTF-8',
            },
            body: formData,
        })
            .then(res => res.json())
            .then(res => {
                // log(res);
                if (res.status == 1) {
                    resolve(res.data)
                } else {
                    $error(res.msg || '上传失败')
                    reject(res)
                }
            })
            .catch(e => {
                console.log(e)
                $error(e.msg || '上传失败')
                reject(e)
            })
    })
}

/**
 * 识别开发环境是否是debug开发环境
 */
export function identifyDebugDevelopmentEnvironment() {
    const {scriptURL} = NativeModules.SourceCode
    const devEvn = scriptURL.split('&')[1]
    return devEvn === 'dev=true'
}

export const Validator = {
    // 大陆手机号
    isMobilePhone: function(str) {
        let reg = /^((\+|00)86)?1([358][0-9]|4[579]|6[67]|7[01356789]|9[189])[0-9]{8}$/
        return reg.test(str)
    },
    // 空字符串
    isEmpty: function(str) {
        return !str
    },
    // 银行卡,找不到合适的...
    isBankCard: function(str) {
        let reg = /^([1-9])(\d{15}|\d{18})$/
        return reg.test(str)
    },
    // 密码 6-18位
    // 同时包含数字和小写字母
    // 同时包含数字和大写字母
    // 同时包含小写字母和大写字母
    isPassword: function(str) {
        let reg = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[0-9A-Za-z]{6,18}$/
        return reg.test(str)
    },
}

//金额格式化
export function formatMoney(number, decimals, dec_point, thousands_sep) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
        sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
        dec = typeof dec_point === 'undefined' ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec)
            return '' + Math.ceil(n * k) / k
        }

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    var re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}

// 判断类型,不要用于基本类型
export const isType = type => target =>
    `[object ${type}]` === Object.prototype.toString.call(target)
export const isArray = isType('Array')
export const isObject = isType('Object')
export const isFunction = isType('Function')

// RN 拨打电话
export function callPhone(mobile) {
    if (!mobile) {
        return $warn('获取电话失败')
    }
    let tel = 'tel:' + mobile // 目标电话

    Linking.canOpenURL(tel)
        .then(supported => {
            if (!supported) {
                console.log('Can not handle tel:' + tel, supported)
                $warn('暂不支持弹出电话,您可以手动拨打: ' + mobile, 10000)
            } else {
                return Linking.openURL(tel)
            }
        })
        .catch(error => {
            $error(error.message || '无法打开电话，可能没有授予电话权限')
            console.log('tel error', error)
        })
}

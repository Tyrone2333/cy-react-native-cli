import {$error} from '../utils/globalFunc'
import {userStore} from '../mobx/userStore'
import {Actions} from 'react-native-router-flux'
import {BASE_URL} from './apiConfig'
const qs = require('qs')

//请求
export function _post(params, props) {
    let {url} = params

    return new Promise((resolve, reject) => {
        // log('access_token: ', userStore.userInfo.access_token)
        fetch(BASE_URL + url, {
            method: 'post',
            headers: {
                cyaccesstoken: userStore.userInfo.access_token || '',
                // cyaccesstoken: '1bc7a4b0715426d6a6ab9f730b86b9c8' || '',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify(params),
        })
            .then(response => {
                if (
                    response.headers
                        .get('content-type')
                        .match(/application\/json/)
                ) {
                    return response.json()
                } else {
                    // 非 json 格式的响应可以转成文本再输出
                    response.text().then(res => {
                        console.log('服务器返回了非 json 格式的数据', res)
                    })
                }
                return response
            })
            .then(data => {
                console.log('我提交的', params)
                console.log(url + ' 接口返回:', data)

                // 根据项目实际自行更改状态 code,突然哪天就变成字符串  ﾍ(;´Д｀ﾍ)
                if (data.status === 2000) {
                    // 只传 data,无需 msg 等无关内容
                    return resolve(data.data)
                } else {
                    // 常见状态码处理
                    switch (data.status) {
                        case 401:
                            $error(data.msg || '请先登录')
                            userStore.logout()
                            if (Actions.currentScene !== 'Login') {
                                Actions.reset('Login')
                            }
                            break
                        case 404:
                            $warn('请求的页面不存在')
                            break
                        case 500:
                            $warn('服务器开小差了,请稍后再试')
                            break
                        default:
                            $error(
                                data.msg ||
                                    data.data ||
                                    '服务器返回了不正确的数据',
                            )
                    }

                    console.log('接口返回错误: ')
                    reject(data)
                }
            })
            .catch(error => {
                $error('网络请求错误')
                console.warn('请求出错: ')
                return reject(error)
            })
    })
}

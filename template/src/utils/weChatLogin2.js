import * as WeChat from 'react-native-wechat'
import {Alert} from 'react-native'
import {weiXinLogin} from '../api/api'

/**
 * Created by en20 on 2019/9/2.
 */
// 后端给的
// export const wxAppid = 'wx61dc76d8c26f6847'
// 开放平台的
export const wxAppid = 'wx29f04785992a52fb'
const scope = 'snsapi_userinfo'
let state = 'wechat_sdk_demo'

export function weChatLogin2() {
    return new Promise((resolve, reject) => {
        //判断微信是否安装
        WeChat.isWXAppInstalled()
            .then(isInstalled => {
                if (isInstalled) {
                    //发送授权请求
                    WeChat.sendAuthRequest(scope, state)
                        .then(responseCode => {
                            //返回code码，通过code获取access_token

                            // Clipboard.setString(responseCode.code)
                            console.log(responseCode)
                            // return
                            if (responseCode.errCode == 0) {
                                weiXinLogin(responseCode.code)
                                    .then(res => {
                                        resolve(res)
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        reject(err)
                                    })
                            }
                        })
                        .catch(err => {
                            // Clipboard.setString(JSON.stringify(err))
                            console.warn(err)
                            Alert.alert('登录授权发生错误：', err.message, [
                                {text: '确定'},
                            ])
                            reject()
                        })
                } else {
                    $warn('没有安装微信')
                    reject('没有安装微信')
                }
            })
            .catch(err => {
                // Clipboard.setString(JSON.stringify(err))
                console.warn(err)
                reject(err)
            })
    })
}

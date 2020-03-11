/**
 * Created by en20 on 2019/7/29.
 */
import {_post} from './request'

// 登录
export function login(mobile, password) {
    let params = {
        url: '/app/login/index',
        mobile,
        password,
    }
    return _post(params)
}

// 注册
export function register(mobile, password, yzm) {
    let params = {
        url: '/app/login/register',
        mobile,
        yzm,
        password,
    }
    return _post(params)
}

// getUser
export function getUser(order_id) {
    let params = {
        url: '/api/user',
        order_id,
    }
    return _post(params)
}

/**
 * 调用粘贴以下:

 ().then((res) => {
            log(res);
        }).catch((error) => {
            console.log(error);
        });

 */

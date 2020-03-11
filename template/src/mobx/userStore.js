/**
 * Created by en20 on 2019/7/29.
 */

// user
import {observable, action, autorun, computed} from 'mobx'

class UserStore {
    // 登录返回的数据
    @observable userInfo = {}

    @action setUserInfo = payload => {
        this.userInfo = payload
        storage.save({
            key: 'userInfo', // 注意:请不要在key中使用_下划线符号!
            data: {
                ...payload,
                avatar: payload.head_img_path || global.defaultAvatar,
            },

            // data: {},
            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            // expires: 1000 * 3600
            expires: null,
        })
    }

    // 登出
    @action logout = () => {
        this.userInfo = {}
        // storage.clearMap();

        storage.remove({
            key: 'userInfo', // 注意:请不要在key中使用_下划线符号!
        })

        console.log('logout,清除数据成功')
    }
}

const userStore = new UserStore()

// 所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发
autorun(() => {
    // alert('11111111111' + userStore.text + JSON.stringify(userStore.userInfo));
})

export {userStore}

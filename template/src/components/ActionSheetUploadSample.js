/**
 * Created by en20 on 2019/10/15.
 * RN 空白页模版
 *
 */

import React, {Fragment, Component} from 'react'

import {
    Text,
    View,
    Button,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Platform,
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import ActionSheet from 'react-native-general-actionsheet'
import {inject, observer} from 'mobx-react'
import SyanImagePicker from 'react-native-syan-image-picker'
import {$warn} from '../utils/globalFunc'
import {uploadImg} from '../utils/utils'
import Wait from './Wait'

// import ImagePicker from 'react-native-image-picker'

@inject(['appState']) // 注入对应的store
@observer
export default class ActionSheetUploadSample extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {}

    componentDidMount() {}

    showActionSheet(callback) {
        let options = {
            imageCount: 2,
            isCrop: false,
            CropW: 375,
            CropH: 450,
            // 裁剪是否可旋转图片（Android）,旋转就不能完全回正,有点蠢
            rotateEnabled: false,
        }
        let photoType = 'asyncShowImagePicker'
        ActionSheet.showActionSheetWithOptions(
            {
                options: ['TakePhoto', 'ChooseFromLibrary', 'Cancel'],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 2,
            },
            res => {
                if (res === 2) {
                    return
                }
                // 相册选择
                else if (res === 1) {
                    photoType = 'asyncShowImagePicker'
                } else if (res === 0) {
                    photoType = 'asyncOpenCamera'
                }

                SyanImagePicker[photoType](options)
                    .then(photos => {
                        // 选择成功
                        console.log('SyanImagePicker 选择图片: ', photos)

                        callback && callback(photos)
                    })
                    .catch(error => {
                        console.warn('打开 ImagePicker 出错:', error)
                        // 弹出取消之外的错误提示
                        if (error.message !== '取消') {
                            $warn(error.message || '打开相册出错')
                        }
                        callback && callback(error)
                    })
            },
        )
    }

    render() {
        return <Fragment>{this.state.wait && <Wait />}</Fragment>
    }
}

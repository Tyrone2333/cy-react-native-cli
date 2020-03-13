/**
 * Created by en20 on 2019/10/23.
 * RN 空白页模版
 */

import React, {Fragment, Component} from 'react'

import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native'

import style from './style'
// import ActionSheetUploadSample from '../../components/ActionSheetUploadSample'
import XButton from '../../components/XButton/XButton'
import SyanImagePicker from 'react-native-syan-image-picker'

export default class TakePhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
        }
    }

    componentDidMount() {}

    // 'asyncOpenCamera' 或者 'asyncShowImagePicker'
    openCamera(photoType = 'asyncOpenCamera') {
        let options = {
            imageCount: 2,
            isCrop: false,
            CropW: 375,
            CropH: 450,
            // 裁剪是否可旋转图片（Android）,旋转就不能完全回正,有点蠢
            rotateEnabled: false,
        }

        SyanImagePicker[photoType](options)
            .then(photos => {
                // 选择成功
                console.log('SyanImagePicker 选择图片: ', photos)
                this.setState({
                    imgUri: photos.uri,
                    photos: photos,
                })
            })
            .catch(error => {
                console.warn('打开 ImagePicker 出错:', error)
            })
    }

    render() {
        return (
            <Fragment>
                {/*<ActionSheetUploadSample*/}
                {/*    ref={r => (this.ActionSheetUploadSample = r)}*/}
                {/*/>*/}

                <View style={style.pageWrapper}>
                    <XButton
                        title={'打开相机'}
                        onPress={res => {
                            this.openCamera()
                            // 一般把这种图片选择封装到单独组件,需要返回结果就再写个回调
                            // this.ActionSheetUploadSample.showActionSheet(
                            //     res => {
                            //         console.log(res)
                            //         if (!res instanceof Error) {
                            //             this.setState({
                            //                 imgUri: res.uri,
                            //                 photos: res,
                            //             })
                            //         }
                            //     },
                            // )
                        }}
                    />

                    <XButton
                        title={'打开相册'}
                        onPress={res => {
                            this.openCamera('asyncShowImagePicker')
                        }}
                    />
                    <Text> 图片列表: </Text>
                    {this.state.photos.map((item, idx) => {
                        return (
                            <Image
                                source={{
                                    uri: item.uri,
                                }}
                                style={{
                                    width: 140,
                                    height: 140,
                                }}
                                resizeMode={'contain'}
                            />
                        )
                    })}
                </View>
            </Fragment>
        )
    }
}

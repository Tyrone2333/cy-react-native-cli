/**
 * Created by en20 on 2019/10/23.
 * RN 空白页模版
 */

import React, {Fragment, Component} from 'react'

import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native'

import style from './style'
import ActionSheetUploadSample from '../../components/ActionSheetUploadSample'
import XButton from '../../components/XButton/XButton'

export default class TakePhoto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            photos: [],
        }
    }

    componentDidMount(): void {}

    render() {
        return (
            <Fragment>
                <ActionSheetUploadSample
                    ref={r => (this.ActionSheetUploadSample = r)}
                />

                <View style={style.pageWrapper}>
                    <XButton
                        title={'打开相机'}
                        onPress={res => {
                            // 一般把这种图片选择封装到单独组件,需要返回结果就再写个回调
                            this.ActionSheetUploadSample.showActionSheet(
                                res => {
                                    console.log(res)
                                    this.setState({
                                        imgUri: res.uri,
                                        photos: res,
                                    })
                                },
                            )
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

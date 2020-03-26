import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        let { images, index } = this.props
        return (
            <View style={styles.container}>
                <ImageViewer
                    imageUrls={images}
                    enableImageZoom={true} // 是否开启手势缩放
                    index={index} // 初始显示第几张
                    // failImageSource={aaa} // 加载失败图片
                    onChange={() => { // 图片切换时触发
                        console.log('图片切换')
                    }}
                    onClick={() => { // 图片单击事件
                        console.log('点击图片')
                    }}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
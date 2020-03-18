import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Video from 'react-native-video';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        
    }

    onBuffer() {
        console.log("视频正在缓冲")
    }

    videoError() {
        console.log("无法加载视频")
    }

    render() {
        return (
            <View style={styles.container}>
                <Video source={{ uri: "http://vfx.mtime.cn/Video/2019/03/21/mp4/190321153853126488.mp4" }}
                    ref={(ref) => {
                        this.player = ref
                    }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                    style={styles.backgroundVideo} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

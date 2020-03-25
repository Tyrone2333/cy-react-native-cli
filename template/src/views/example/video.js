import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Video from 'react-native-video-controls';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let path = 'http://vfx.mtime.cn/Video/2019/03/21/mp4/190321153853126488.mp4'
        return (
            <View style={styles.container}>
                <View style={styles.fullScreen}>
                        <Video
                            source={{uri: path}}
                            disableBack
                            disableVolume
                            controlTimeout={5000}
                            onPause={()=>{console.log('暂停')}}
                            onPlay={()=>{console.log('播放状态')}}
                        />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor:'#000'
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
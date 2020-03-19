import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';

import { px } from '../../style/util/config'
import * as WeChat from 'react-native-wechat'
WeChat.registerApp('wxe47473c33591a9db')

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    share1 () {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({ type: 'text', description: '测试微信好友分享的文本内容' })
                        .catch((error) => {
                            Alert.alert(error.message);
                        });
                } else {
                    Alert.alert('请安装微信');
                }
            });
    }

    share2 () {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({
                        title: '微信好友测试的链接',
                        description: '分享的标题内容',
                        thumbImage: '分享的标题图片',
                        type: 'news',
                        webpageUrl: '分享的链接'
                    })
                        .catch((error) => {
                            Alert.alert(error.message);
                        });
                } else {
                    Alert.alert('请安装微信');
                }
            });
    }
    share3 () {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToTimeline({ type: 'text', description: '测试微信朋友圈分享的文本内容' })
                        .catch((error) => {
                            Alert.alert(error.message);
                        });
                } else {
                    Alert.alert('请安装微信');
                }
            });
    }
    share4 () {
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToTimeline({
                        title: '分享的标题',
                        description: '分享的标题内容',
                        thumbImage: '分享的标题图片',
                        type: 'news',
                        webpageUrl: '分享的链接'
                    })
                        .catch((error) => {
                            Alert.alert(error.message);
                        });
                } else {
                    Alert.alert('请安装微信');
                }
            });
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.list}>
                    <TouchableWithoutFeedback onPress={() => this.share1()} >
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>微信好友分享的文本</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.share2()} >
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>微信好友分享链接</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.share3()} >
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>微信朋友圈分享的文本</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.share4()} >
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>微信朋友圈分享的链接</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        alignItems: 'center',
        flex: 1,
        paddingTop: px(150)
    },
    btn: {
        backgroundColor: '#3E83D7',
        width: px(400),
        height: px(100),
        marginTop: px(50),
        borderRadius: px(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: px(30)
    }
})
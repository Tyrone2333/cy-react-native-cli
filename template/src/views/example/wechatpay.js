import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    Alert
} from 'react-native';

import {px} from '../../style/util/config'
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

    select(index) {
        this.setState({
            payway: index,
        })
    }
    
    submit () {
        // data是访问后端接口返回的数据
        let data = {
            info: {
                partnerid: '11',
                prepayid: '22',
                noncestr: '33',
                timestamp: '44',
                package: '55',
                sign: '66',
                appid: '77',
            }
        }
        WeChat.isWXAppInstalled().then( ( isInstalled ) => {
            if (isInstalled) {
                WeChat.pay({
                    partnerid: data.info.partnerid.toString(),  // 商家向财付通申请的商家id
                    prepayid: data.info.prepayid.toString(),   // 预支付订单
                    noncestr: data.info.noncestr.toString(),   // 随机串，防重发
                    timestamp: data.info.timestamp.toString(),  // 时间戳，防重发
                    package: data.info.package.toString(),    // 商家根据财付通文档填写的数据和签名
                    sign: data.info.sign.toString(),   // 商家根据微信开放平台文档对数据做的签名
                    appid: data.info.appid.toString()
                }).then(res => {
                    this.props.navigation.navigate('PayStatus', {status: 1})
                })
            } else {
                Alert.alert('请安装微信');
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={ styles.way }>
                    <View style={ styles.wayTop }>
                        <Text style={ styles.wayInfo }>选择支付方式</Text>
                    </View>
                    <View style={ styles.list }>
                        <TouchableWithoutFeedback onPress={ () => this.select(1) }>
                            <View style={ styles.item }>
                                <Image style={ styles.pic } source={ require('../../assets/pay/wechat.png') }></Image>
                                <View style={ styles.txt }>
                                    <Text style={ styles.title }>微信支付</Text>
                                    <Text style={ styles.desc }>使用微信支付，安全快捷</Text>
                                </View>
                                <View style={ styles.status }>
                                    <Image style={ styles.spic } resizeMode={ 'cover' } source={  this.state.payway != 1 ? require('../../assets/pay/check.png') : require('../../assets/pay/checkon.png')  }></Image>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={ () => this.select(2) }>
                            <View style={ styles.item }>
                                <Image style={ styles.pic } source={ require('../../assets/pay/card.png') }></Image>
                                <View style={ styles.txt }>
                                    <Text style={ styles.title }>余额支付</Text>
                                    <Text style={ styles.desc }>您当前可用余额：¥0</Text>
                                </View>
                                <View style={ styles.status }>
                                    <Image style={ styles.spic } source={  this.state.payway != 2 ? require('../../assets/pay/check.png') : require('../../assets/pay/checkon.png')  }></Image>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={ () => this.submit() }>
                    <View style={ styles.btn }>
                        <Text style={ styles.btnTxt }>立即付款</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    way: {
        backgroundColor: '#fff',
    },
    wayTop: {
        height: px(86),
        borderBottomWidth: px(1),
        borderColor: '#ddd',
        justifyContent: 'center',
        paddingLeft: px(20),
    },
    wayInfo: {
        color: '#333',
        fontSize: px(28)
    },
    list: {
        borderBottomWidth: px(1),
        borderColor: '#ddd',
    },
    item: {
        borderBottomWidth: px(1),
        borderColor: '#ddd',
        marginBottom: -1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: px(20),
        paddingTop: px(28),
        paddingRight: px(20),
        paddingBottom: px(28)
    },
    txt: {
        flex: 1,
    },
    title: {
        fontSize: px(32),
        color: '#333',
    },
    desc: {
        fontSize: px(26),
        color: '#999'
    },
    pic: {
        marginRight: px(28),
        width: px(74),
        height: px(74),
    },
    status: {
        width: px(36),
        height: px(36)
    },
    spic: {
        width: '100%',
        height: '100%'
    },
    btn: {
        backgroundColor: '#ff9508',
        borderRadius: px(10),
        margin: px(30),
        marginRight: px(70),
        marginLeft: px(70),
        justifyContent: 'center',
        alignItems: 'center',
        height: px(90)
    },
    btnTxt: {
        color: '#fff',
        fontSize: px(34)
    },
})
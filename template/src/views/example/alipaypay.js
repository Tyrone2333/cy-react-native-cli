import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    Image,
    Alert
} from 'react-native';

import { px } from '../../style/util/config'
import Alipay from '@0x5e/react-native-alipay';

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


    submit() {
        let url = 'http://api3.yituqipei.com/app/recharge/charge'
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'version': '3.1.0'
            },
            body: 'token=f9397665f93f7c85f126759309fbcf1d&recharge_card_id=&recharge_money=0.01&pay_type=2'
        }).then(res => res.json()).then(data => {
            console.log(data)
            Alipay.pay(data.info).then(res => {
                console.log(res)
                if (res.resultStatus == "9000") {
                    console.log('操作成功')
                } else if (res.resultStatus == "6001") {
                    console.log('用户中途取消')
                }
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.way}>
                    <View style={styles.wayTop}>
                        <Text style={styles.wayInfo}>选择支付方式</Text>
                    </View>
                    <View style={styles.list}>
                        <TouchableWithoutFeedback onPress={() => this.select(1)}>
                            <View style={styles.item}>
                                <Image style={styles.pic} source={require('../../assets/pay/alipay.png')}></Image>
                                <View style={styles.txt}>
                                    <Text style={styles.title}>支付宝支付</Text>
                                    <Text style={styles.desc}>使用支付宝支付，安全快捷</Text>
                                </View>
                                <View style={styles.status}>
                                    <Image style={styles.spic} resizeMode={'cover'} source={this.state.payway != 1 ? require('../../assets/pay/check.png') : require('../../assets/pay/checkon.png')}></Image>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.select(2)}>
                            <View style={styles.item}>
                                <Image style={styles.pic} source={require('../../assets/pay/card.png')}></Image>
                                <View style={styles.txt}>
                                    <Text style={styles.title}>余额支付</Text>
                                    <Text style={styles.desc}>您当前可用余额：¥0</Text>
                                </View>
                                <View style={styles.status}>
                                    <Image style={styles.spic} source={this.state.payway != 2 ? require('../../assets/pay/check.png') : require('../../assets/pay/checkon.png')}></Image>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => this.submit()}>
                    <View style={styles.btn}>
                        <Text style={styles.btnTxt}>立即付款</Text>
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

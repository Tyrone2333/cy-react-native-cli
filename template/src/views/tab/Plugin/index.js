import React, { Component } from 'react'

import {observer} from 'mobx-react'

import {TouchableOpacity, StyleSheet, Text, View, TextInput} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {px} from '../../../style/util/config'
import SplashScreen from 'react-native-splash-screen'
@observer // 监听当前组件
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [
                {
                    name: '轮播swiper',
                    url: 'exampleSwiper'
                },
                {
                    name: '视频播放',
                    url: 'exampleVideo'
                },
                {
                    name: '插件c',
                    url: 'TakePhoto'
                },
                {
                    name: '插件d',
                    url: 'TakePhoto'
                },
                {
                    name: '插件e',
                    url: 'TakePhoto'
                },
            ],
            listShow: [],
            keyword: ''
        }
    }

    componentDidMount() {
        SplashScreen.hide()
        let {list} = this.state
        this.setState({
            listShow: list
        })
    }

    toDetail (url) {
        Actions.push(url)
    }

    search (key) {
        let {list, listShow} = this.state
        listShow = list.filter(item => {
            if (item.name.indexOf(key) > -1) {
                return true
            }
        })
        this.setState({
            keyword: key,
            listShow
        })
    }

    render() {
        let { listShow, keyword } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <TextInput style={[styles.input]} onChangeText={(val) => this.search(val)} underlineColorAndroid="transparent" placeholder="请输入关键字" placeholderTextColor={'#bbbbbb'} keyboardType={'default'} value={keyword}/>
                </View>
                <ScrollView style={styles.list}>
                    {
                        listShow.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => this.toDetail(item.url)}>
                                    <View style={[styles.row, index % 2 == 0 ? styles.even : {}]}>
                                        <Text style={styles.btn_text}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    row: {
        width: '100%',
        height: px(60),
        backgroundColor: '#eee',
        justifyContent: 'center',
        paddingLeft: px(30)
    },
    even: {
        backgroundColor: '#ddd',
    },
    btn_text: {
        color: '#333',
        fontSize: px(26)
    },
    input: {
        width: '100%',
        paddingLeft: px(30),
        backgroundColor: '#fff'
    }
  });

import React, {Fragment, Component} from 'react'
import {observer, inject} from 'mobx-react'

import {Platform, StyleSheet, Text, View, Button} from 'react-native'

@inject(['appState']) // 注入对应的store
@observer // 监听当前组件
export default class User extends Component {
    modify = () => this.props.appState.changeNum(Math.random())
    render() {
        return (
            <Fragment>
                <Text>我是 mobx-react: {this.props.appState.num}</Text>
                <Button onPress={this.modify} title="数字+随机" />
            </Fragment>
        )
    }
}

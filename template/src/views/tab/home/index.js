import React, {Fragment, Component} from 'react'

import {observer, inject} from 'mobx-react'

import {Platform, StyleSheet, Text, View, Button} from 'react-native'

import {Actions} from 'react-native-router-flux'
import {getUser} from '../../../api/api'
import Divider from '../../../components/Divider/Divider'
import {$confirm, $warn} from '../../../utils/globalFunc'
import XButton from '../../../components/XButton/XButton'
import Wait from '../../../components/Wait'
import {px} from '../../../style/util/config'
import YButton from '../../../components/XButton/YButton'
import SplashScreen from 'react-native-splash-screen'

@inject(['appState']) // 注入对应的store
@inject(['userStore']) // 注入对应的store
@observer // 监听当前组件
export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // wait: true,
        }
    }
    componentDidMount(): void {
        this.props.userStore.setUserInfo({
            username: 'en20',
        })
        console.log(this.props.userStore)
        SplashScreen.hide()
    }

    toA() {
        console.log(11111)
        Actions.jump('test')
    }
    apiTest() {
        this.setState({wait: true})

        getUser()
            .then(res => {
                log(res)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                this.setState({wait: false})
            })
    }

    render() {
        return (
            <Fragment>
                {this.state.wait && <Wait />}

                <Text>我是首页{this.props.appState.num}</Text>
                <Text>yoooooooo</Text>
                <Button
                    onPress={() => this.toA()}
                    title="去往 TTTTTTTest 页面"
                />
                <Button
                    onPress={() => Actions.jump('TakePhoto')}
                    title="去往 拍照 页面"
                />
                <YButton
                    onPress={() => this.apiTest()}
                    isLoading={this.state.wait}
                    style={{
                        width: 300,
                    }}>
                    api test
                </YButton>

                <Divider text={'分割线'} />
                <View>
                    <XButton
                        onPress={() => $warn('$warn')}
                        title="$warn('$warn')"
                    />
                    <XButton
                        onPress={() =>
                            $confirm().then(res => {
                                $warn('点击了确认')
                            })
                        }
                        title="$confirm"
                    />
                </View>
                <Divider text={'分割线'} />
            </Fragment>
        )
    }
}

//  {this.props.appState.num}

import React, {Component} from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    BackHandler,
} from 'react-native'
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux'
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'

import CustomNavBar from './CustomNavBar'
import TransparentNavBar from './TransparentNavBar'
import ImgNavBar from './ImgNavBar'

import TTTTTTTest from '../views/TTTTTTTest'
import TakePhoto from '../views/TakePhoto'

import Home from '../views/tab/home'
import Mine from '../views/tab/Mine'

const TabBarIcon = ({tabBarLabel, focused}) => {
    let icon = null
    const labels = [
        {
            label: '首页',
            activeIcon: require('../assets/homefocus.png'),
            icon: require('../assets/home.png'),
        },
        {
            label: '我的',
            activeIcon: require('../assets/userfocus.png'),
            icon: require('../assets/user.png'),
        },
    ]
    labels.map(item =>
        item.label == tabBarLabel
            ? (icon = focused ? item.activeIcon : item.icon)
            : null,
    )
    return <Image style={{width: 25, height: 25}} source={icon} />
}

const Route = () => (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
            style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: 100,
                backgroundColor: '#fff',
            }}
        />

        <Router
            sceneStyle={{backgroundColor: '#f8f8f8'}}
            backAndroidHandler={() => {
                if (
                    Actions.currentScene !== '_Home' &&
                    Actions.currentScene !== '_Mine' &&
                    Actions.currentScene !== 'Login'
                ) {
                    return false
                } else {
                    if (
                        this.lastBackPress &&
                        this.lastBackPress + 2000 > Date.now()
                    ) {
                        BackHandler.exitApp()
                        return false
                    }
                    this.lastBackPress = Date.now()
                    $warn('再点一次退出')
                    return true
                }
            }}>
            <Modal
                transitionConfig={() => ({
                    screenInterpolator:
                        CardStackStyleInterpolator.forHorizontal,
                })}>
                <Tabs
                    hideNavBar
                    key={'tab'}
                    activeTintColor={'#00ADA9'}
                    inactiveTintColor={'#999999'}
                    // 最外层包裹了 SafeAreaView,这里的底部要去掉
                    safeAreaInset={{bottom: 'never'}}>
                    <Scene
                        hideNavBar
                        key="Home"
                        tabBarLabel="首页"
                        icon={TabBarIcon}
                        component={Home}
                    />
                    <Scene
                        hideNavBar
                        key="Mine"
                        tabBarLabel="我的"
                        icon={TabBarIcon}
                        component={Mine}
                    />
                </Tabs>

                <Scene
                    key="test"
                    title="TTTTTTTest"
                    component={TTTTTTTest}
                    navBar={CustomNavBar}
                />
                <Scene
                    key="TakePhoto"
                    title="TakePhoto"
                    component={TakePhoto}
                    navBar={CustomNavBar}
                />
            </Modal>
        </Router>
    </SafeAreaView>
)

export default Route

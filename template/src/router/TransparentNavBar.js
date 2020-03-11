import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import React from 'react'
import {Actions} from 'react-native-router-flux'
import {flexBetween, px} from '../style/util/config'

export default class TransparentNavBar extends React.Component {
    render() {
        return (
            <View style={[styles.container]}>
                {/*左侧箭头*/}
                <View style={styles.navBarItem}>
                    {!this.props.hideLeft && (
                        <TouchableOpacity
                            onPress={Actions.pop}
                            style={[styles.navBarItem, styles.navBarLeft]}>
                            <Image
                                style={{
                                    width: 10,
                                    height: 19,
                                }}
                                resizeMode="contain"
                                source={require('../assets/img/icon/icon-back-nav-transparent.png')}
                            />
                        </TouchableOpacity>
                    )}
                </View>

                {/*中间 title*/}
                <View style={styles.navBarItem}>
                    <Text style={styles.navTitleText}>{this.props.title}</Text>
                </View>

                {/*右侧为空*/}
                <View style={styles.navBarItem} />
            </View>
        )
    }
}

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 0,
        elevation: 0,

        width: width,
        height: px(90),
        ...flexBetween,
    },

    navBarItem: {
        minWidth: px(80),
    },

    navTitleText: {
        fontSize: px(34),
        color: '#fff',
        // lineHeight: px(40),
        fontWeight: 'bold',
    },

    navBarLeft: {
        height: '100%',
        paddingLeft: px(24),
        justifyContent: 'center',
    },
})

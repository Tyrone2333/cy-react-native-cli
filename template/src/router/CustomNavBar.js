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

export default class CustomNavBar extends React.Component {
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
                                source={require('../assets/img/icon/icon-back-nav.png')}
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
        width: width,
        height: px(90),
        ...flexBetween,
        backgroundColor: '#fff',

        // borderColor: '#E6E6E6',
        borderColor: '#ddd',
        // borderTopWidth: px(1),
        borderBottomWidth: px(1),
    },

    navBarItem: {
        minWidth: px(80),
    },

    navTitleText: {
        fontSize: px(34),
        color: '#000',
        // lineHeight: px(40),
        fontWeight: 'bold',
    },

    navBarLeft: {
        height: '100%',
        paddingLeft: px(24),
        justifyContent: 'center',
    },
})

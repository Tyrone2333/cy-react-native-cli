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

export default class ImgNavBar extends React.Component {
    render() {
        return (
            <View style={[styles.container]}>
                {/*左侧箭头*/}
                <View style={styles.navBarItem} />

                {/*中间 title*/}
                <View style={styles.navBarItem}>
                    <Image
                        style={{
                            width: 64,
                            height: 27,
                        }}
                        resizeMode="contain"
                        source={require('../assets/img/index-logo.png')}
                    />
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

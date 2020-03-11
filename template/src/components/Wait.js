'use strict'

import React, {Component} from 'react'

import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
} from 'react-native'
import {px} from '../style/util/config'

export default class Wait extends Component {
    render() {
        return (
            <View style={styles.wait_box}>
                <ActivityIndicator
                    color="#F54029"
                    style={styles.icon}
                    size="large"
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wait_box: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: px(100),
        height: px(100),
        marginLeft: px(-50),
        marginTop: px(-50),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
})

// css(`
//     .wait_box{
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         width: 100px;
//         height: 100px;
//         margin-left: -50px;
//         align-items: center;
//         justify-content: center;
//         z-index: 10000;
//
//     }
//
// `);

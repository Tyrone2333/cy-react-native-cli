/**
 * Created by en20 on 2019/7/22.
 */
import {
    px,
    themeColor,
    pagePadding,
    flexBetween,
    flexCenter,
} from '../../style/util/config.js'

import {StyleSheet, Dimensions} from 'react-native'
import React from 'react'

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    DividerWrapper: {
        // backgroundColor: '#a4b3f7',
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },

    dividerText: {
        fontSize: px(28),
        color: '#aeaeae',
        // lineHeight: px(40),
        marginHorizontal: px(36),
        flex: 0,
    },

    dividerLine: {
        height: px(1),
        // width:"50%",
        flex: 1,
        borderColor: '#e8e8e8',
        borderTopWidth: px(1),
        // borderTopWidth:1,
    },
})

export default styles

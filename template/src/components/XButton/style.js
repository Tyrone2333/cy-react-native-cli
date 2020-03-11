/**
 * Created by en20 on 2019/7/15.
 */

import {flexCenter, px, themeColor} from '../../style/util/config'

import {StyleSheet, Platform} from 'react-native'

import {Dimensions} from 'react-native'

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    btnWrapper: {
        // width: '100%',
        // paddingHorizontal: px(30),
        // overflow: 'scroll',
        ...flexCenter,
        width: px(600),
        height: px(88),
        borderRadius: px(44),
        backgroundColor: '#D19F92',
    },
    btnBig: {
        fontSize: px(34),
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        // ...Platform.select({
        //   ios: {
        //     lineHeight: px(88),
        //   },
        // }),
    },
})

export default styles

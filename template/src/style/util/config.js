import {Dimensions, StyleSheet} from 'react-native'

const {width} = Dimensions.get('window')

// import DeviceInfo from 'react-native-device-info'
// let getPhone = DeviceInfo.getModel().toLowerCase().replace(/\s/ig, '')

const rem = 10 // REM根元素字体大小
const px = px => (px == 1 ? StyleSheet.hairlineWidth : (px * width) / 750)

const swiperItemWidth = px(620) //会员卡页面轮播
const swiperItemWidth2 = px(520) //分享有礼页面轮播

// 主题颜色
const themeColor = {
    red: '#F54029',
}
let pagePadding = {
    paddingLeft: px(24),
    paddingRight: px(24),
}
// 设定文字
let setFont = {
    fontSize: px(28),
    color: '#333',
    lineHeight: px(40),
    fontWeight: 'bold',
}
// 设定 div
let setView = {
    width: px(155),
    height: px(155),
    backgroundColor: 'rgba(185,29,34,0.85)',
    // 圆角
    borderRadius: px(10),
    // 边框
    borderColor: '#E6E6E6',
    borderWidth: px(1),
    // 仅仅顶部边框
    borderTopWidth: px(1),
}
// 设置边距
let paddingAll = {
    paddingLeft: px(24),
    paddingRight: px(24),
    paddingTop: px(32),
    paddingBottom: px(32),
    // 设置marginVertical相同于同时设置marginTop和marginBottom。
    // 设置marginHorizontal相同于同时设置marginLeft和marginRight。
    paddingVertical: px(32),
    paddingHorizontal: px(23),

    marginTop: px(),
    marginBottom: px(),
    marginLeft: px(),
    marginRight: px(),
}
// 绝对定位
let absolute = {
    // position: 'relative',
    position: 'absolute',
    left: 0,
    top: 0,
    right: px(21),
    bottom: px(58),
}
export let textRed = {
    color: themeColor.red,
}
export let flexBetween = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}
export let flexCenter = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    // 子项自己变换位置
    // justifySelf: 'flex-end',
    // alignSelf:'flex-end',
}
// 文字居中
export let textAlign = {
    textAlign: 'center',
    textAlignVertical: 'center',
}
export {rem, px, themeColor, swiperItemWidth, swiperItemWidth2, pagePadding}

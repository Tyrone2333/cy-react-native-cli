/**
 * Created by en20 on 2019/7/15.
 */

import React, {Fragment, Component} from 'react'

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    ImageBackground,
    FlatList,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
} from 'react-native'

import style from './style'
import {Actions} from 'react-native-router-flux'
import {px} from '../../style/util/config'
import {isArray, isObject} from '../../utils/utils'
import {TouchableContainer} from '../TouchableContainer'

const DEFAULT_FONT_SIZE = px(34)
const DEFAULT_FONT_COLOR = '#fff'
export default class XButton extends Component {
    static defaultProps = {
        activeOpacity: 0.8,
        isView: false,
        title: '',
    }

    componentDidMount(): void {}

    render() {
        let textStyles = extractTextStyle(this.props.style)

        return (
            <TouchableContainer
                isView={this.props.isView}
                activeOpacity={this.props.activeOpacity}
                style={[
                    style.btnWrapper,
                    this.props.style,
                    this.props.wrapperStyle,
                ]}
                onPress={() => this.props.onPress && this.props.onPress()}>
                <Text
                    style={[
                        style.btnBig,
                        {
                            ...textStyles,
                        },
                        this.props.textStyle,
                    ]}>
                    {this.props.title}
                </Text>
            </TouchableContainer>
        )
    }
}

function extractTextStyle(style) {
    let st = {}
    // console.log(style);
    if (isObject(style)) {
        st.fontSize = style.fontSize || DEFAULT_FONT_SIZE
        st.color = style.color || DEFAULT_FONT_COLOR
    } else if (isArray(style)) {
        style.map((item, idx) => {
            // 有可能 undefined
            if (isObject(item)) {
                st.fontSize = item.fontSize || st.fontSize || DEFAULT_FONT_SIZE
                st.color = item.color || st.color || DEFAULT_FONT_COLOR
            }
        })
    }
    return st
}

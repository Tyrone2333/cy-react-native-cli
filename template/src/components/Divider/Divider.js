/**
 * Created by en20 on 2019/7/.
 *
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

export default class Divider extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(): void {}

    render() {
        return (
            <Fragment>
                <View style={[style.DividerWrapper, this.props.style]}>
                    <View style={style.dividerLine} />

                    <Text style={style.dividerText}>{this.props.text}</Text>

                    <View style={style.dividerLine} />
                </View>
            </Fragment>
        )
    }
}

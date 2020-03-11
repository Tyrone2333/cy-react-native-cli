/**
 * Created by en20 on 2019/10/23.
 * RN 空白页模版
 */

import React, {Fragment, Component} from 'react'

import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native'

import style from './style'

export default class Template extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(): void {}

    render() {
        return (
            <Fragment>
                <View style={style.pageWrapper}>
                    <Text>空白模版页</Text>
                    <Text>福建省厦门市思明区莲前街道望海路1号楼101</Text>
                </View>
            </Fragment>
        )
    }
}

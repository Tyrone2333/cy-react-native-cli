import {TouchableOpacity, View} from 'react-native'
import React, {Fragment, Component} from 'react'

/**
 * Created by en20 on 2019/8/15.
 * 一个基础容器,返回一个 TouchableOpacity/View 用作根组件
 * isView:  默认为可触摸组件,isView:使用 View 作为根组件
 */
export class TouchableContainer extends Component {
    renderChild() {
        if (React.Children.count(this.props.children) > 0) {
            return this.props.children
        }
    }

    render() {
        // 默认为可触摸组件,isView:使用 View 作为根组件
        if (this.props.isView) {
            return <View style={[this.props.style]}>{this.renderChild()}</View>
        } else {
            return (
                <TouchableOpacity
                    style={[this.props.style]}
                    onPress={() => this.props.onPress && this.props.onPress()}
                    activeOpacity={this.props.activeOpacity}>
                    {this.renderChild()}
                </TouchableOpacity>
            )
        }
    }
}

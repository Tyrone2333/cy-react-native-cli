import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import { px } from '../../style/util/config';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [{
                url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
            }, {
                url: 'https://avatars2.githubusercontent.com/u/7970118?v=3&s=460',
            }, {
                url: 'https://avatars2.githubusercontent.com/u/7970662?v=3&s=460',
            }]
        }
    }

    show(images, index) {
        Actions.exampleShowImage({images, index})
    }

    render() {
        let {images} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    {
                        images.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback onPress={() => this.show(images, index)} key={index}>
                                    <Image style={styles.pic} source={{uri: item.url}}></Image>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    box: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    pic: {
        width: px(200),
        height: px(200)
    }
});
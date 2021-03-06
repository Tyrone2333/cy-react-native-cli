import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import Swiper from 'react-native-swiper';

export default class Index extends Component {
    indexChanged(index) {
        console.log('滑动了')
        console.log(index)
    }
    render() {
        return (
            <Swiper
                style={styles.container}
                loop={true}
                onIndexChanged={(index) => this.indexChanged(index)}
                activeDotStyle={{backgroundColor: 'red'}}
            >
                <View style={styles.slide1}>
                    <Text style={styles.text}>Android</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>iOS</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>Java</Text>
                </View>
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

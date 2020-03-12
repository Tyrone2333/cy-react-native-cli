/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'

import Route from './src/router'
import {Provider} from 'mobx-react'
import store from './src/mobx'

export default class App extends Component {
    render() {
        return (
            <Provider {...store}>
                <Route />
            </Provider>
        )
    }
}

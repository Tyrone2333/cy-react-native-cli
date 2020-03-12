/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'

// 全局公共函数
import * as func from './src/utils/globalFunc'
for (let i in func) {
    window[i] = func[i]
}
// 全局公共函数 END

// 去黄屏警告
console.disableYellowBox = true

AppRegistry.registerComponent(appName, () => App)

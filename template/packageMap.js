/**
 * Created by en20 on 2020/3/11.
 *
 * 修改 `package.json` 中的内容
 */

// 脚本
module.exports.scripts = {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "clean": "cd ./android && gradlew clean",
    "open-release-folder": "start android\\app\\build\\outputs\\apk\\release",
    "open-debug-folder": "start android\\app\\build\\outputs\\apk\\debug",
    "release": "cd android && ./gradlew assembleRelease && npm run open-release-folder",
    "release-test": "react-native run-android --variant=release",
    "pod-install": "cd ios && pod install --verbose --no-repo-update",
    "test": "jest",
    "git-reset-master": "git reset master --hard",
    "git-push-master": "git push origin master",
    "git-push": "git push origin --all",
    "eslint-fix": "eslint . --fix",
}

// 依赖项 必装
module.exports.dependencies = {
    // ============ dependencies ===============
    // 只有这一个需要固定版本
    "react-native-root-toast": "3.1.2",
    "react-native-router-flux": "4.0.6",
    "react-native-storage": "^1.0.1",


    // ============ devDependencies ===============
    "@react-native-community/async-storage": "^1.8.1",
    "mobx": "^5.14.0",
    "mobx-react": "^6.1.3",
    "@babel/preset-flow": "^7.0.0",
    "@babel/plugin-proposal-decorators": "^7.6.0",

    "qs": "^6.9.1",
    "react-native-splash-screen": "^3.2.0",
}

// 依赖项  选装
module.exports.optionalDependencies = {
    "react-native-general-actionsheet": "^1.0.4",
    "react-native-syan-image-picker": "^0.4.6",
    "react-native-swiper": "1.6.0-rc.3",
    // 如果一个插件需要依赖另一个插件一起安装,就把他写成对象形式
    "jpush-react-native": {
        version: "^2.7.5",
        dependencies: {
            "jcore-react-native": "^1.7.5",
        }
    },

    "react-native-video-controls": {
        version:  "^2.4.0",
        dependencies: {
            "react-native-video": "5.0.2",
        }
    },
    "react-native-wechat-lib": "^1.1.15",
    "@0x5e/react-native-alipay": "^0.2.6",
}

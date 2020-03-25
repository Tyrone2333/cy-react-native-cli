/**
 * Created by en20 on 2020/3/13
 *
 * 这里处理以项目名创建的一些路径下的文件
 */
const path = require('path')

module.exports = function() {
    return function(files, metalsmith, done) {
        const meta = metalsmith.metadata()
        // path.sep 提供平台特定的路径片段分隔符：
        //      Windows 上是 \。
        //      POSIX 上是 /。
        const dynamicPath = `dynamicPathFile${ path.sep }`

        // 复制 java 相关
        const mainActivityJava = files[`${ dynamicPath }MainActivity.java`]
        const mainApplicationJava = files[`${ dynamicPath }MainApplication.java`]

        // path.join() 方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径。
        // 零长度的 path 片段会被忽略。 如果连接的路径字符串是零长度的字符串，则返回 '.'，表示当前工作目录。
        mainActivityJava && (files[path.join(`android/app/src/main/java/com/${ meta.projectName }/MainActivity.java`)] = mainActivityJava)

        mainApplicationJava && (files[path.join(`android/app/src/main/java/com/${ meta.projectName }/MainApplication.java`)] = mainApplicationJava)

        // 复制 ios 相关 - Info.plist
        const infoPlist = files[`${ dynamicPath }Info.plist`]
        infoPlist && (files[path.join(`ios/${ meta.projectName }/Info.plist`)] = infoPlist)

        // 复制 ios 相关 - AppDelegate.m
        const AppDelegateM = files[`${ dynamicPath }AppDelegate.m`]
        AppDelegateM && (files[path.join(`ios/${ meta.projectName }/AppDelegate.m`)] = AppDelegateM)


        if (meta.dependencies.includes('react-native-wechat-lib')) {
            // 微信相关
            const wxapi1 = files[path.join(`${ dynamicPath }wxapi/WXEntryActivity.java`)]
            const wxapi2 = files[path.join(`${ dynamicPath }wxapi/WXPayEntryActivity.java`)]
            wxapi1 && (files[path.join(`android/app/src/main/java/com/${ meta.projectName }/wxapi/WXEntryActivity.java`)] = wxapi1)

            wxapi2 && (files[path.join(`android/app/src/main/java/com/${ meta.projectName }/wxapi/WXPayEntryActivity.java`)] = wxapi2)
        }

        // Object.keys(files).forEach((fileName) => {
        //
        //     console.log(fileName)
        // })
        // console.log(metalsmith)

        done()
    }
}

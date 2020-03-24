/**
 * Created by en20 on 2020/3/13
 *
 * 这里处理以项目名创建的一些路径下的文件
 */

module.exports = function() {
    return function(files, metalsmith, done) {
        const meta = metalsmith.metadata()
        const dynamicPath = 'dynamicPathFile\\'

        // 复制 java 相关
        const mainActivityJava = files[`${ dynamicPath }MainActivity.java`]
        const mainApplicationJava = files[`${ dynamicPath }MainApplication.java`]

        mainActivityJava && (files[`android\\app\\src\\main\\java\\com\\${ meta.projectName }\\MainActivity.java`] = mainActivityJava)

        mainApplicationJava && (files[`android\\app\\src\\main\\java\\com\\${ meta.projectName }\\MainApplication.java`] = mainApplicationJava)

        // 复制 ios 相关
        const infoPlist = files[`${ dynamicPath }Info.plist`]
        infoPlist && (files[`ios\\${ meta.projectName }\\Info.plist`] = infoPlist)

        if (meta.dependencies.includes('react-native-wechat-lib')) {
            // 微信相关
            const wxapi1 = files[`${ dynamicPath }wxapi\\WXEntryActivity.java`]
            const wxapi2 = files[`${ dynamicPath }wxapi\\WXPayEntryActivity.java`]
            wxapi1 && (files[`android\\app\\src\\main\\java\\com\\${ meta.projectName }\\wxapi\\WXEntryActivity.java`] = wxapi1)

            wxapi2 && (files[`android\\app\\src\\main\\java\\com\\${ meta.projectName }\\wxapi\\WXPayEntryActivity.java`] = wxapi2)
        }

        // Object.keys(files).forEach((fileName) => {
        //
        //     console.log(fileName)
        // })
        // console.log(metalsmith)

        done()
    }
}

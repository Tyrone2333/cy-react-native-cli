/**
 * Created by en20 on 2020/3/13
 *
 * 这里处理以项目名创建的一些路径下的文件
 */
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const fs = require("fs")
const path = require("path")
let {render} = require('consolidate').ejs


module.exports = function (src) {
    return async function (files, metalsmith, done) {
        const meta = metalsmith.metadata()
        const dynamicPath = 'dynamicPathFile\\'

        // 复制 java 相关
        let mainActivityJava = files[dynamicPath + 'MainActivity.java']
        let mainApplicationJava = files[dynamicPath + 'MainApplication.java']

        mainActivityJava && (files['android\\app\\src\\main\\java\\com\\' + meta.projectName + '\\MainActivity.java'] = mainActivityJava)
        mainApplicationJava && (files['android\\app\\src\\main\\java\\com\\' + meta.projectName + '\\MainApplication.java'] = mainApplicationJava)

        // 复制 ios 相关
        let infoPlist = files[dynamicPath + 'Info.plist']
        infoPlist && (files['ios\\' + meta.projectName + '\\Info.plist'] = infoPlist)

        // Object.keys(files).forEach((fileName) => {
        //
        //     console.log(fileName)
        // })
        // console.log(metalsmith)


        done()
    }

}

/**
 * Created by en20 on 2020/3/13
 *
 * 这里处理 java 文件
 */
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const fs = require("fs")
const path = require("path")
let {render} = require('consolidate').ejs


module.exports = function copyMainJava(src) {
    return async function (files, metalsmith, done) {
        const meta = metalsmith.metadata()

        // 动态路径名 `android\app\src\main\java\com\rn61test`下的文件修改
        //     `MainActivity.java`,`MainApplication.java`

        let mainActivityJava = files['MainActivity.java']
        let mainApplicationJava = files['MainApplication.java']

        mainActivityJava && (files['android\\app\\src\\main\\java\\com\\' + meta.projectName + '\\MainActivity.java'] = mainActivityJava)
        mainApplicationJava && (files['android\\app\\src\\main\\java\\com\\' + meta.projectName + '\\MainApplication.java'] = mainApplicationJava)

        // Object.keys(files).forEach((fileName) => {
        //
        //     console.log(fileName)
        // })
        // console.log(metalsmith)


        done()
    }

}

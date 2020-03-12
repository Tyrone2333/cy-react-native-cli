/**
 * Created by en20 on 2020/3/10.
 */
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const fs = require("fs")
const path = require("path")

let removeIgnore = (src) => {

    return function (files, metalsmith, done) {
        // 判断下载的项目模板中是否有templates.ignore
        const ignoreFile = path.resolve(process.cwd(), path.join(src, 'template.ignore'))

        if (fs.existsSync(ignoreFile)) {
            // 定义一个用于移除模板中被忽略文件的metalsmith插件
            const meta = metalsmith.metadata()
            // 先对ignore文件进行渲染，然后按行切割ignore文件的内容，拿到被忽略清单
            const ignores = Handlebars
                .compile(fs.readFileSync(ignoreFile).toString())(meta)
                .split('\n').map(s => s.trim().replace(/\//g, "\\")).filter(item => item.length)
            //删除被忽略的文件
            for (let ignorePattern of ignores) {
                if (files.hasOwnProperty(ignorePattern)) {
                    delete files[ignorePattern]
                }
            }
        }

        done()
    }

}
module.exports = removeIgnore

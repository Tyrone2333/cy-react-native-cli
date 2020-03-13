/**
 * Created by en20 on 2020/3/10.
 */
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const fs = require("fs")
const path = require("path")
let {render} = require('consolidate').ejs

let removeIgnore = (src) => {

    return async function (files, metalsmith, done) {
        // 判断下载的项目模板中是否有templates.ignore
        const ignoreFile = path.resolve(process.cwd(), path.join(src, 'template.ignore'))

        if (fs.existsSync(ignoreFile)) {
            // 定义一个用于移除模板中被忽略文件的 metalsmith 插件
            const meta = metalsmith.metadata()
            // 先对ignore文件进行渲染，然后按行切割ignore文件的内容，拿到被忽略清单
            let content = await render(fs.readFileSync(ignoreFile).toString(), meta) // 用数据渲染模板

            const ignores = content.split('\n')
                // 去掉空格,把 / 换成 //
                .map(s => s.trim().replace(/\//g, "\\"))
                // 去空行
                .filter(item => item.length)
                // # 开头为注释,去掉
                .filter(item => /^(?!#)/.test(item))

            //删除被忽略的文件
            // console.log('ignores', ignores)
            // console.log('files', Object.keys(files) )
            for (let ignorePattern of ignores) {
                let reg = new RegExp('^' + ignorePattern.replace(/\\/g, `\\\\`))
                Object.keys(files).forEach((fileName) => {
                    // console.log(reg, reg.test(fileName), fileName)
                    if (reg.test(fileName)) {
                        console.log('删除', fileName)
                        delete files[fileName]
                    }
                })
                // 旧的
                // if (files.hasOwnProperty(ignorePattern)) {
                //     delete files[ignorePattern]
                // }
            }
        }

        done()
    }

}
module.exports = removeIgnore

const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const remove = require("./remove")
const fs = require("fs")
const path = require("path")
const removeIgnore = require("../plugins/removeIgnore")
let {render} = require('consolidate').ejs

module.exports = function (context) {
    let metadata = context.metadata
    let src = context.downloadTemp
    let dest = './' + context.root
    if (!src) {
        return Promise.reject(new Error(`无效的source：${src}`))
    }

    return new Promise((resolve, reject) => {
        const metalsmith = Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)

            // 使用一个一个插件处理,把它们连在一起
            .use(removeIgnore(src))

            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata()
                console.log(meta)
                Object.keys(files).forEach(async fileName => {

                    // 指定格式的文件才用模版编译
                    let reg = new RegExp(/\.(js|md|json)/)
                    let content = files[fileName].contents.toString() // 获取文件中的内容

                    if (reg.test(fileName)) {
                        if (content.includes('<%')) { // 文件中用<% 我才需要编译
                            console.log(fileName + ' 编译中')
                            content = await render(content, meta) // 用数据渲染模板
                            files[fileName].contents = Buffer.from(content) // 渲染好的结果替换即可
                        }
                    }

                    // console.log(files[fileName])
                    // const t = files[fileName].contents.toString()
                    // console.log(fileName)
                    // files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta))
                })
                done()
            }).build(err => {
                // 测试,不要移除目录
                // remove(src)
                err ? reject(err) : resolve(context)
            })
    })
}

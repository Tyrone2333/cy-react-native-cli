const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const remove = require("./remove")
const fs = require("fs")
const path = require("path")
const removeIgnore = require("../plugins/removeIgnore")

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
                Object.keys(files).forEach(fileName => {
                    const t = files[fileName].contents.toString()
                    files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta))
                })
                done()
            }).build(err => {
                // 测试,不要移除目录
                // remove(src)
                err ? reject(err) : resolve(context)
            })
    })
}

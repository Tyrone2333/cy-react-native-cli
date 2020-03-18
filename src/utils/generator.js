const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const remove = require('./remove')
const fs = require('fs')
const path = require('path')
const removeIgnore = require('../plugins/removeIgnore')
const copyDynamicPathFile = require('../plugins/copyDynamicPathFile')
const {
    render,
} = require('consolidate').ejs

const ora = require('ora')
const utils = require('../utils/utils')

module.exports = function(context) {
    const {
        metadata,
    } = context

    const src = context.downloadTemp
    const dest = `./${ context.root }`
    if (!src) {
        return Promise.reject(new Error(`无效的source：${ src }`))
    }

    return new Promise((resolve, reject) => {
        const metalsmith = Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            // 使用一个一个插件处理,把它们连在一起

            // 复制动态路径里的内容
            .use(copyDynamicPathFile(src))
            // 移除 template.ignore 中列出的文件
            .use(removeIgnore(src))

            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata()
                Object.keys(files).forEach(async fileName => {
                    // 指定格式的文件才用模版编译
                    const reg = new RegExp(/\.(js|md|json|gradle|xml|java|plist|m|h)/)
                    let content = files[fileName].contents.toString() // 获取文件中的内容

                    if (reg.test(fileName)) {
                        if (content.includes('<%')) { // 文件中用<% 我才需要编译
                            // console.log(fileName + ' --- 编译中')
                            content = await render(content, meta) // 用数据渲染模板

                            files[fileName].contents = Buffer.from(content) // 渲染好的结果替换即可
                        }
                    }
                })

                done()
            })
            .build(err => {
                // 测试,不要移除目录
                // remove(src)
                err ? reject(err) : resolve(context)
            })
    })
}

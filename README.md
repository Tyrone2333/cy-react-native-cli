# react-native-template
创意 react-native 项目生成器
根据官方的 `react-native init AwesomeProject` 生成项目,集成`mobx`,`react-native-router-flux`路由,`react-native-root-toast`弹窗.

可选安装列表:
```text
'react-native-syan-image-picker(图片选择,拍照)',

'react-native-general-actionsheet',

```

# 使用
```text
安装: npm i cy-react-native-cli -g
使用: cy init <projectName>
卸载: npm uninstall cy-react-native-cli -g
```
 
# 开发

1. 使用 `npm i` 安装依赖
2. 运行 `npm link`
3. 运行 `npm run nodemon`,目录自行替换,最好选择其他盘符.如果在当前目录下测试会因为生成的文件夹里有 .git 导致本项目 git diff 被污染.



#### script 说明
- nodemon : 进入 temp 目录执行 `../src/index.js` 监听 `cy-react-native-cli` 所有文件变更,除了 temp 目录
- 

# 实现方式
react-native-cli

在这之前你应该先阅读[基于node.js的脚手架工具开发经历](https://juejin.im/post/5a31d210f265da431a43330e),明白node工程下package.json中的bin字段可以定义命令名和关联执行文件,了解命令行交互的基本原理.

### 让命令全局执行
nodejs内置了对命令行操作的支持，node工程下package.json中的bin字段可以定义命令名和关联的执行文件。

      "bin": {
        "cy-cli": "./bin/www.js",
        "cy": "./bin/www.js"
      },
      
经过这样配置的nodejs项目，在使用-g选项进行全局安装的时候，会自动在系统的[prefix]/bin目录下创建相应的符号链接（symlink）关联到执行文件。如果是本地安装，这个符号链接会生成在./node_modules/.bin目录下。这样做的好处是可以直接在终端中像执行命令一样执行nodejs文件。关于prefix，可以通过npm config get prefix获取。
在 www.js 编写入口逻辑

        #!/usr/bin/env node
        
        require('../src/index')()
        
注意这里 `#!/usr/bin/env node` 必须放在首行,有空格空行都不行.在当前的目录下执行 npm link，将 cy 和 cy-cli 命令链接到全局环境。接着打开其他不相干的盘符目录如 `g:\Temp\tttttttttttemp`,执行 cy 即可执行 `src/index.js` 开始开发.你也可以执行我写好的脚本 `npm run nodemon`,目录自行替换


### 生成项目,获取模版
接下来是利用 commander 来处理命令行,inquire 提问,相关使用方式可参见前面提到的文章.

模版`/template`并不是一整个固定的项目,而是项目的部分文件.
固定模版将难以更新 react-native 版本,为了获取到最新版的 react-native,我们需要先通过 `npx react-native init [projectName]` 拉取最新的 react-native 项目,然后把`/template`的内容增量替换原文件.
这样做的坏处是模版文件不够直观,编辑器会不认模版语法 `<% %>`.如果你也使用 JetBrains 系编辑器,可以在`/template`右键 => `Mark Directory as` => `Excluded` 让编辑器忽略语法检查

具体流程:
1. 询问一些项目基本情况,选择要集成的插件,并将这些信息通过 Promise链 传递下去.
2. 通过 download-git-repo 下载自己写的模版,用于替换官方的 react-native 项目.出于开发的考虑我用的是 `src/template` 下的本地模版,这样不用每次都去下载文件.
3. 通过 `npx react-native init [projectName]` 拉取最新的 react-native 项目.
4. git 仓库创建,并提交一个 init 的 commit.这么做可以直观看到我们对原始项目的改动
5. 修改 `package.json` 的 `scripts`,添加一些常用脚本.
6. 安装必装依赖项(路由等)和第一步的可选插件

### 使用 metalsmith + ejs 处理模板
现在我们需要在 react-native 原始项目的基础上替换模版,工具是[metalsmith](https://github.com/segmentio/metalsmith) .
它最大的一个特点就是 EVERYTHING IS PLUGIN，所以，metalsmith本质上就是一个胶水框架，通过黏合各种插件来完成生产工作。

        const metalsmith = Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            // 复制动态路径里的内容
            .use(copyDynamicPathFile(src))
            // 移除 template.ignore 中列出的文件
            .use(removeIgnore(src))
            
这段代码很好理解: 初始化 metalsmith,传入需要的参数 metadata,读取源目录中的所有文件,定义输出目录,接着调用一系列操作文件的插件.
#### 插件 - copyDynamicPathFile
react-native 会根据你的项目名生成动态路径如 `android\app\src\main\java\com\rn61test\MainApplication.java`,这里的`rn61test`就是你的项目名.
所以我们不能在 template 下直接建立对应的文件替换

    return async function (files, metalsmith, done) {
        const meta = metalsmith.metadata()
        const dynamicPath = 'dynamicPathFile\\'

        // 复制 java 相关
        let mainActivityJava = files[dynamicPath + 'MainActivity.java']
        let mainApplicationJava = files[dynamicPath + 'MainApplication.java']

        mainActivityJava && (files['android\\app\\src\\main\\java\\com\\' + meta.projectName + '\\MainActivity.java'] = mainActivityJava)
        mainApplicationJava && (files['android\\app\\src\\main\\java\\com\\' + meta.projectName + '\\MainApplication.java'] = mainApplicationJava)

        done()
    }
    
获取文件内容,在 files 中添加对应文件,非常简单
#### 插件 - removeIgnore
在 `templates.ignore` 中定义需要移除的文件,调用插件对所有文件匹配,匹配成功则移除.
目前我只实现了 文件/文件夹 的移除,注释.

#### ejs 编译文件
    let {render} = require('consolidate').ejs

    // ...
            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata()
                Object.keys(files).forEach(async fileName => {

                    // 指定格式的文件才用模版编译
                    let reg = new RegExp(/\.(js|md|json|gradle|xml|java|plist|m|h)/)
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
                err ? reject(err) : resolve(context)
            })

 
### 参考文档
- [基于node.js的脚手架工具开发经历](https://juejin.im/post/5a31d210f265da431a43330e)
- [【中高级前端必备】手摸手教你撸一个脚手架](https://juejin.im/post/5d37d982e51d45108c59a635)
- [Vue-cli原理分析](https://juejin.im/post/5b592db551882536e5178ce6#heading-0)

# 正在解决问题

增加开发/正式版本,正式版下载远程的模版,并增加更新检测

增加自动升级 package.json/android/ios 版本号,并根据 git commit 信息生成 CHANGELOG.md

检查 cli 更新,地址: http://registry.npmjs.org/cy-react-native-cli

# 其他工具
美化我们的脚手架
- ora - 显示spinner
- chalk - 给枯燥的终端界面添加一些色彩

# License
MIT

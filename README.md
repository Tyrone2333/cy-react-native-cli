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
3. 你需要进入一个无关的目录,执行 `cy init <projectName>` 如果在当前目录下测试会因为生成的文件夹里有 .git 导致本项目 git diff 被污染.参考 scripts 里的 `nodemon4`
```
    "nodemon4": "g: && cd g:\\Temp\\aaa && nodemon --ignore E:\\enzo\\code\\android\\cy-cli\\temp\\*  --watch E:\\enzo\\code\\android\\cy-cli\\* E:\\enzo\\code\\android\\cy-cli\\src\\index.js init aaa -c -y",
```


// cwd是指当前node命令执行时所在的文件夹目录
// __dirname是指被执行js文件所在的文件夹目录


#### script 说明
- nodemon : 进入 temp 目录执行 `../src/index.js` 监听 `cy-react-native-cli` 所有文件变更,除了 temp 目录
- 


react-native-cli

 @react-native-community/cli
 
 1. 先执行官方 cli 生成项目,然后选择集成.要可选择地集成插件难度较大,只能通过读取文件,手动替换字符
 
 2. 直接使用固定的模版
 
 3. 搬运模版文件的 `/src`,替换 `index.js`,`App.js` ...
 
# 正在解决问题
动态路径名 `android\app\src\main\java\com\rn61test`下的文件修改
`MainActivity.java`,`MainApplication.java`

# 功能




# 使用 metalsmith 处理模板


# 美化我们的脚手架
ora - 显示spinner
chalk - 给枯燥的终端界面添加一些色彩

# License
MIT

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://gitee.com/yang_update/cy-cli/compare/v1.1.0...v1.2.0) (2020-03-30)


### Features

* 优化 package.json 获取 ([d23c8fd](https://gitee.com/yang_update/cy-cli/commit/d23c8fd317b262e397ab26fe07396b89bb91555d))
* 增加 eslint 配置 ([1ef9965](https://gitee.com/yang_update/cy-cli/commit/1ef9965b7ff159cd0af8b3877d31e8a606c5c5b5))
* 增加 ignores 文件的注释 ([68cd9ed](https://gitee.com/yang_update/cy-cli/commit/68cd9ed7108dfe2ccc49f29d56fe7158ab582a4f))
* 增加 启动图 安卓端详细文档,修复启动图在非 16:9 的变形问题.尝试使用 .9.PNG 做自适应启动,但失败 ([9ea5914](https://gitee.com/yang_update/cy-cli/commit/9ea5914d624e309f56baf543585c441078519539))
* 增加 极光推送 安卓端 ([4e4e5f8](https://gitee.com/yang_update/cy-cli/commit/4e4e5f82e5e12122b468ec33a391472f5a70fa02))
* 微信 sdk 迁移到新库 react-native-wechat-lib,测试安卓分享小程序会闪退. ([075a0fe](https://gitee.com/yang_update/cy-cli/commit/075a0fe29c4c19e7e090abdb3880f9b554d3ff50))
* 新增 ios 报错 No bundle URL present 的解决方案 ([7ff9a34](https://gitee.com/yang_update/cy-cli/commit/7ff9a349ca601e2c391385fad90914e927b7e8cb))
* 新增 ios 支付宝集成 ([caf1fe8](https://gitee.com/yang_update/cy-cli/commit/caf1fe80e7c64ae2d126488d5d1159f329faeadb))
* 新增 ios 的极光推送，并增加文档说明 ([59e8ee8](https://gitee.com/yang_update/cy-cli/commit/59e8ee8d46929c3bd192bf46d5015338435b9d11))
* 新增 proguard-rules.pro ([2b46a8e](https://gitee.com/yang_update/cy-cli/commit/2b46a8e204950a5b26318ff7d2bdf54bf1585a33))
* 新增 在 IOS 上运行的 log ([44142f7](https://gitee.com/yang_update/cy-cli/commit/44142f72a037262d2ad16afcc6b913928afd7ef2))
* 重写一个插件需要依赖另一个插件的安装方式 ([950a752](https://gitee.com/yang_update/cy-cli/commit/950a75289e1ca18341376c8c8a9a5b5840610c97))


### Bug Fixes

* 修复 package 是保留字的问题,允许三元表达式跨越多行 ([ac07488](https://gitee.com/yang_update/cy-cli/commit/ac074880796ebb2531e910af91392ba996428032))
* 修复 Windows/POSIX 分隔符不同导致的文件路径出错.使用 path.sep / path.join() 连接文件，然后规范化生成的路径。 ([a3f780f](https://gitee.com/yang_update/cy-cli/commit/a3f780fc4f03b60d5b7aec07b7cb9478cacae21b))
* 修复分享到小程序闪退的问题.略缩图不存在会导致闪退 ([bbd6dda](https://gitee.com/yang_update/cy-cli/commit/bbd6dda7ca443fe880005d4b9d6c51f2f5b93b0f))
* 修复未集成微信导致安卓打包出错的问题 ([38dd67f](https://gitee.com/yang_update/cy-cli/commit/38dd67f27ba85e5eee7830fb95520654f4d9e401))

## [1.1.0](https://gitee.com/yang_update/cy-cli/compare/v1.0.5...v1.1.0) (2020-03-17)


### Features

* 增加检查 cli 更新,不更新就不给用:> ([7e450d6](https://gitee.com/yang_update/cy-cli/commit/7e450d62c3128db3af03bd46aa74941c8dc7392c))
* 完善文档,增加实现方式的说明 ([6a2e3e4](https://gitee.com/yang_update/cy-cli/commit/6a2e3e44d5755523b3ea5b367db898f5bb495fa3))

### 1.0.5 (2020-03-17)


### Features

* checkbox 增加中文操作提示 ([0703ee2](https://gitee.com/yang_update/cy-cli/commit/0703ee2475130f6e8903652bfffa283018c19166))
* execSh 执行初始化 react-native 的操作,添加 ejs 模版替换文件 ([0a9b2d0](https://gitee.com/yang_update/cy-cli/commit/0a9b2d08baaf42320464e880b1a564eb43389d60))
* init,可以把命令安装到全局环境 ([c72ac6d](https://gitee.com/yang_update/cy-cli/commit/c72ac6d7ae1a5b1eb433d8ae46304005e5709a9d))
* 今天又可以执行 execSh 了?? ([2d6eebb](https://gitee.com/yang_update/cy-cli/commit/2d6eebb55a95f9e7e6fffaaabba205a6d8de39eb))
* 修改 nodemon,不用再手动重启脚本 ([8f05a13](https://gitee.com/yang_update/cy-cli/commit/8f05a13d628db4a1189c5bffde0cb25751c5ac87))
* 发布到 npm 1.0.2, 修复拍照页相关代码,改为不依赖 ActionSheetUpload ([4d15cfc](https://gitee.com/yang_update/cy-cli/commit/4d15cfc730a93564bbb870a3f6c68f5f9841f5ae))
* 增加 -y 跳过询问 ([a16df1f](https://gitee.com/yang_update/cy-cli/commit/a16df1f40877e85b3eb1659a0eb5ab26d301b564))
* 增加 ios Info.plist 相关的处理 ([cb38959](https://gitee.com/yang_update/cy-cli/commit/cb38959650188dd6a59eb6e28c4ac9b97f57eded))
* 增加初始化 react-native,增加初始化 git 仓库,防止文件修改无法复原 ([8c3dbe5](https://gitee.com/yang_update/cy-cli/commit/8c3dbe5f9a3dedf0751230e662327bfdddf2e446))
* 增加动态路径名 .java 的拷贝 ([229ac55](https://gitee.com/yang_update/cy-cli/commit/229ac555540cdd7b051be4b0c44faa1299e72483))
* 增加替换 package.json 中的脚本 ([932d7b5](https://gitee.com/yang_update/cy-cli/commit/932d7b5ae17817eacc47080e702d2db7e7f5bdf5))
* 实现 .ignore 移除文件夹,实现注释功能. ([4793450](https://gitee.com/yang_update/cy-cli/commit/47934509fc0ee155f952d4227f230d79b8f0d692))
* 添加 ASCII 启动文字,添加 inquirer 交互 ([031868e](https://gitee.com/yang_update/cy-cli/commit/031868e9f092b214a913a4ec32f03d4ce0fac820))
* 添加依赖项可选/必选的安装,可以替换修改安卓文件夹下的部分内容 ([b200c69](https://gitee.com/yang_update/cy-cli/commit/b200c6977ba73a817f5cc5a1de75f8f536e00061))
* 添加测试模版文件夹 ([7b1ee7f](https://gitee.com/yang_update/cy-cli/commit/7b1ee7f6943a4237e7586e513019219522f3dd35))
* 添加输出版本信息,移动主函数到单独文件 ([d68e0d1](https://gitee.com/yang_update/cy-cli/commit/d68e0d1667777e255fba62c2b8302f0a81040517))
* 清理 todo ([5748ad5](https://gitee.com/yang_update/cy-cli/commit/5748ad5243dc68152a9b39cadefd391cb83b2197))
* 简化入口方式,修复 projectName 没有被修改的问题 ([2f0e651](https://gitee.com/yang_update/cy-cli/commit/2f0e6516f961b51499693fbfb59320675bfbb5b4))
* 误删文件还原.增加 metalsmith 工作流 ([086054a](https://gitee.com/yang_update/cy-cli/commit/086054a04a9487768dc27cfd168f4af8dfa25cdf))


### Bug Fixes

* 修复 fs.pathExists is not a function,把 fs-extra 添加到 dependencies ([4bd3fd3](https://gitee.com/yang_update/cy-cli/commit/4bd3fd35df9e2f54fa9874c2be6779220f6b5876))
* 简化最初的项目已经存在判断,可能修复文件权限问题 ([98fca96](https://gitee.com/yang_update/cy-cli/commit/98fca96b3867c81829cb155bd46d07313c844261))

/**
 * Created by en20 on 2020/3/9.
 */

const fs = require('fs-extra')
const path = require('path')

const program = require('commander')
const chalk = require('chalk')

const glob = require('glob')
const download = require('./utils/download.js')
const inquirer = require('inquirer')
const generator = require('./utils/generator')
const shell = require('shelljs')
const logSymbols = require('log-symbols')

const execSh = require('./lib/exec-sh')
const utils = require('./utils/utils')
const packageMap = require(path.join(__dirname, '../template/packageMap'))

// 检查更新
require('./utils/checkUpdate')

function installCmdAdd(depName, version, exactVersion) {
    // 是否是已 ^ 开头的最新版本
    const latest = /^\^/.test(version)

    const v = version.replace(/\^/, '')

    if (exactVersion) {
        return ` ${ depName }@${ v } `
    }

    // 如果传入的不是 ^ 开头,无论如何都会返回一个精确版本
    return latest ? ` ${ depName } ` : ` ${ depName }@${ v } `
}

module.exports = async function() {
    // cwd是指当前node命令执行时所在的文件夹目录
    // __dirname是指被执行js文件所在的文件夹目录
    const packageJson = require(path.join(__dirname, '../package.json'))

    console.log(`
 ██████╗██╗   ██╗      ██████╗██╗     ██╗
██╔════╝╚██╗ ██╔╝     ██╔════╝██║     ██║
██║      ╚████╔╝█████╗██║     ██║     ██║
██║       ╚██╔╝ ╚════╝██║     ██║     ██║
╚██████╗   ██║        ╚██████╗███████╗██║
 ╚═════╝   ╚═╝         ╚═════╝╚══════╝╚═╝
 
 当前版本: ${ chalk.green(packageJson.version) }
`)

    // 要创建的项目名
    let projectName = ''
    // 不出现询问,所有选项都按默认
    let yesForAll = false

    program
        .version(packageJson.version, '-v, --version')
        .option('-y, --yes', '不出现询问,所有选项都按默认')
        .option('--exact', '固定所有依赖的版本号')

    // init,创建 react-native 项目.测试先复制目录

    program
        .command('init <name>')
        .description('创建 react-native 项目')
        .action(name => {
            projectName = name
            // Async with promises:
            // fs.copy(path.join(__dirname, '../templates/react-native'), `./${name}`)
            //     .then(() => log(chalk.green('创建 ' + name + ' 成功 :)')))
            //     .catch(err => console.error(err))
        })

    program.parse(process.argv)

    yesForAll = program.yes

    if (!projectName) {
        // project-name 必填
        // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
        program.help()

        return
    }

    let next = null

    try {
        if (fs.existsSync(projectName)) {
            if (yesForAll) {
                console.log('项目已存在')

                next = Promise.resolve(projectName)
            } else {
                // 目录非空,询问是否移除
                next = inquirer
                    .prompt([{
                        name: 'deleteExist',
                        message: `项目 ${ projectName } 已经存在,是否删除?`,
                        type: 'confirm',
                        // todo 测试,默认不删
                        default: false,
                    }])
                    .then(async answer => {
                        if (answer.deleteExist) {
                            await fs.remove(path.resolve(process.cwd(), projectName))
                        } else {
                            // todo 识别是否为 react-native 项目,不是的话退出
                        }

                        return Promise.resolve(projectName)
                    })
            }
        } else {
            next = Promise.resolve(projectName)
        }
    } catch (err) {
        console.log(err)

        process.exit(1)
    }

    next && go()

    function go() {
        next.then(projectRoot => {
            if (projectRoot !== '.') {
                // 不应该创建文件夹,交给 react-native
                // 要全局装 react-native 命令
                // fs.ensureDir(projectRoot)
            }

            // 仅测试,不用重复下载
            return {
                name: projectRoot,
                root: projectRoot,
                downloadTemp: path.join(__dirname, '../template'),
            }

            return download(projectRoot).then(target => {
                console.log(target)

                return {
                    name: projectRoot,
                    root: projectRoot,
                    downloadTemp: target,
                }
            })
        })
            .then(context => {
                // 询问一些项目情况
                const prompts = [{
                    name: 'projectName',
                    message: '项目的名称',
                    default: context.name,
                }, {
                    name: 'projectDescription',
                    message: '项目的简介',
                    default: `A project named ${ context.name }`,
                }, {
                    type: 'checkbox',
                    name: 'dependencies',
                    message: '请选择需要集成的插件 (按 <space> 选择, <a> 全选, <i> 反选)\n',
                    choices: [{
                        name: 'react-native-syan-image-picker(图片选择,拍照)',
                        value: 'react-native-syan-image-picker',
                        checked: false,
                    }, {
                        name: 'react-native-general-actionsheet(类似IOS中ActionSheet的弹出按钮组)',
                        value: 'react-native-general-actionsheet',
                        checked: false,
                    }, {
                        name: '极光推送',
                        value: 'jpush-react-native',
                        checked: false,
                    }, {
                        name: 'react-native-swiper(轮播)',
                        value: 'react-native-swiper',
                        checked: false,
                    }, {
                        name: 'react-native-image-zoom-viewer(图片预览)',
                        value: 'react-native-image-zoom-viewer',
                        checked: false,
                    }, {
                        name: 'react-native-video-controls(视频播放)',
                        value: 'react-native-video-controls',
                        checked: false,
                    }, {
                        name: 'react-native-wechat-lib(微信SDK)',
                        value: 'react-native-wechat-lib',
                        checked: false,
                    }, {
                        name: '@0x5e/react-native-alipay(支付宝SDK)',
                        value: '@0x5e/react-native-alipay',
                        checked: false,
                    }],
                    default: [],
                }]

                if (yesForAll) {
                    const answers = utils.getPromptDefaultAnswer(prompts)
                    // 不询问直接 resolve
                    return Promise.resolve({
                        ...context,
                        metadata: {
                            ...answers,
                        },
                    })
                }

                return inquirer.prompt(prompts).then(answers => ({
                    ...context,
                    metadata: {
                        ...answers,
                    },
                }))
            })
            .then(async context => {
                // eslint-disable-next-line prefer-destructuring
                projectName = context.metadata.projectName

                // 遍历目标目录,隐藏文件如 .git 不会被检测到
                const list = glob.sync(`${ projectName }/*`)

                // 当前已经有文件
                if (list.length) {
                    return Promise.resolve(context)
                }

                console.log(logSymbols.info,
                    chalk.green('安装预计需要 3-8 分钟,请耐心等待'))

                // 如果是空目录就初始化 react-native
                await execSh
                    .promise(`npx react-native init  ${ projectName }`)
                    .catch(res => {
                        console.error(res)

                        console.error(logSymbols.error,
                            chalk.red('react-native 安装失败,程序退出'))

                        process.exit(1)
                    })

                return Promise.resolve(context)
            })
            .then(async context => {
                // git commit 保存一下

                // 这里改变 node 命令执行时所在的文件夹目录! 这里的改变很重要!!! 当前已经 cd 进入了目标目录
                shell.cd(projectName)

                const hasGit = fs.pathExistsSync('.git')
                // 没有 git 仓库
                if (!hasGit) {
                    await execSh('git  init')

                    await execSh('git  add .')

                    await execSh('git commit -m init')

                    console.log(logSymbols.success,
                        chalk.green('git 仓库创建完成'))
                }

                return Promise.resolve(context)
            })
            // 读取 package.json,修改内容
            .then(async context => {
                // console.log('context', context)
                const exactVersion = program.exact

                const rnPkg = await fs.readJson('./package.json')

                // 替换 package.json 中的脚本
                rnPkg.scripts = packageMap.scripts

                // 写入 json
                await fs.writeJson('./package.json', rnPkg, {
                    spaces: 2,
                })

                const {
                    metadata,
                } = context

                let installDependenciesCmd = 'yarn add'

                // 必装依赖项
                const {
                    dependencies,
                } = packageMap

                for (const depName in dependencies) {
                    const version = dependencies[depName]
                    if (!utils.isItInstalled(depName, rnPkg)) {
                        installDependenciesCmd += installCmdAdd(depName, version, exactVersion)
                    }
                }

                // 可选依赖性,用户有选的插件才添加.
                const {
                    optionalDependencies,
                } = packageMap

                const waitingForInstallArr = metadata.dependencies
                // 遍历选中的插件列表
                for (const depName of waitingForInstallArr) {
                    // 如果插件没有安装
                    if (!utils.isItInstalled(depName, rnPkg)) {
                        let version = ''

                        // 如果插件的值是字符串,那就是版本号
                        if (typeof optionalDependencies[depName] === 'string') {
                            version = optionalDependencies[depName]

                            installDependenciesCmd += installCmdAdd(depName, version, exactVersion)
                        } else {
                            // 插件的值是对象,说明插件还有依赖其他插件
                            version = optionalDependencies[depName].version

                            installDependenciesCmd += installCmdAdd(depName, version, exactVersion)

                            const pluginDependencies = optionalDependencies[depName].dependencies

                            for (const pluginDepName in pluginDependencies) {
                                const version2 = pluginDependencies[pluginDepName]
                                installDependenciesCmd += installCmdAdd(pluginDepName, version2, exactVersion)
                            }
                        }
                    }
                }

                console.log('添加插件: ', installDependenciesCmd)

                // 如果有需要执行依赖安装命令
                installDependenciesCmd.length > 8
                && (await execSh.promise(installDependenciesCmd).catch(res => {
                    console.error(res)

                    console.error(logSymbols.error,
                        chalk.red('插件依赖安装失败,程序退出'))

                    process.exit(1)
                }))

                return Promise.resolve(context)
            })
            // 退回初始的命令执行目录
            .then(context => {
                shell.cd('..')

                return Promise.resolve(context)
            })
            // 删除临时文件夹，将文件移动到目标目录下
            .then(context => generator(context))
            // 成功用绿色显示，给出积极的反馈
            .then(context => {
                console.log(chalk.green('创建成功:)'))

                console.log(chalk.cyan('在 Android 上运行： '))

                console.log(chalk.black(` - cd ${ context.root }`))

                console.log(chalk.black(' - yarn run android'))

                console.log(chalk.cyan('在 IOS 上运行： '))

                console.log(chalk.black(` - cd ${ context.root }`))

                console.log(chalk.black(' - yarn run pod-install'))

                console.log(chalk.black(' - yarn run ios'))
            })
            .catch(err => {
                // 失败了用红色，增强提示
                console.log(err)

                console.error(logSymbols.error, chalk.red('创建项目失败'))
            })
    }

    // console.log(' chdir - %s ', program.chdir)
    // console.log(' config - %s ', program.config)
    // console.log(' max: %j', program.max)
    // console.log(' seed: %j', program.seed)
    // program.range = program.range || []
    // console.log(' range: %j..%j', program.range[0], program.range[1])
    // console.log(' list: %j', program.list)
    // console.log(' color: %j', program.color)
    // console.log(' cheese: %j', program.cheese)

    // 必须先创建了 react-native 相关文件下面代码才能正常执行

    // 读 package.json
    // fs.readJson(`./${projectName}/package.json`).then(packageObj => {
    //     console.log(packageObj.dependencies) // => 0.1.3
    // })
    //     .catch(err => {
    //         console.error(err)
    //     })

    // const spinner = ora(`正在 npx react-native init`)
    // spinner.start();
    // // 执行 npx react-native init AwesomeProject 没有任何输出
    // if (shell.exec('npx react-native init ' + projectName).code !== 0) {
    //
    //     process.exit(1);
    //     spinner.fail()
    //
    // }
    // spinner.succeed()
    //
    // console.log(222)
    // return
}


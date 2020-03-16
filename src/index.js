/**
 * Created by en20 on 2020/3/9.
 */
console.log(`
 ██████╗██╗   ██╗      ██████╗██╗     ██╗
██╔════╝╚██╗ ██╔╝     ██╔════╝██║     ██║
██║      ╚████╔╝█████╗██║     ██║     ██║
██║       ╚██╔╝ ╚════╝██║     ██║     ██║
╚██████╗   ██║        ╚██████╗███████╗██║
 ╚═════╝   ╚═╝         ╚═════╝╚══════╝╚═╝
`)

const fs = require('fs-extra')
var path = require('path')

var program = require('commander')
const chalk = require('chalk')
const log = console.log
const glob = require('glob')
const download = require('./utils/download.js')
const inquirer = require('inquirer')
const generator = require('./utils/generator')
const remove = require('./utils/remove')
var shell = require('shelljs')
const ora = require('ora')
const childProcess = require('child_process')
const logSymbols = require('log-symbols')

const execSh = require('./lib/exec-sh')
const utils = require('./utils/utils')
let packageMap = require(path.join(__dirname, '../template/packageMap'))


// 要创建的项目名
let projectName = ''
// 不出现询问,所有选项都按默认
let yesForAll = false
program
    // todo 读取 package.json
    .version('1.0.1', '-v, --version')
    .option('-y, --yes', '不出现询问,所有选项都按默认')

// init,创建 react-native 项目.测试先复制目录

program
    .command('init <name>')
    .description('创建 react-native 项目')
    .action(function (name) {
        projectName = name
        // Async with promises:
        // fs.copy(path.join(__dirname, '../templates/react-native'), `./${name}`)
        //     .then(() => log(chalk.green('创建 ' + name + ' 成功 :)')))
        //     .catch(err => console.error(err))

    })

program.parse(process.argv)
yesForAll = program.yes

if (!projectName) {  // project-name 必填
    // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
    program.help()
    return
}

let next = undefined
let rootName = path.basename(process.cwd())

try {
    if (fs.existsSync(projectName)) {
        if (yesForAll) {
            console.log('项目已存在')

            rootName = projectName
            next = Promise.resolve(projectName)
        } else {
            // 目录非空,询问是否移除
            next = inquirer.prompt([
                {
                    name: 'deleteExist',
                    message: `项目 ${projectName} 已经存在,是否删除?`,
                    type: 'confirm',
                    // todo 测试,默认不删
                    default: false,
                },
            ]).then(async answer => {
                if (answer.deleteExist) {
                    await fs.remove(path.resolve(process.cwd(), projectName))
                } else {
                    // todo 识别是否为 react-native 项目,不是的话退出
                }
                rootName = projectName
                return Promise.resolve(projectName)
            })
        }
    } else {
        // rootName 都设为 项目目录,不处理可能在 ./ 的情况
        rootName = projectName
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


            // todo 不应该创建文件夹,交给 react-native
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
            let prompts = [
                {
                    name: 'projectName',
                    message: '项目的名称',
                    default: context.name,
                }, {
                    name: 'projectDescription',
                    message: '项目的简介',
                    default: `A project named ${context.name}`,
                }, {
                    type: 'checkbox',
                    name: 'dependencies',
                    message: '请选择需要集成的插件',
                    choices: [
                        {
                            name: 'react-native-syan-image-picker(图片选择,拍照)',
                            value: 'react-native-syan-image-picker',
                            checked: false,
                        }, {
                            name: 'react-native-general-actionsheet(类似IOS中ActionSheet的弹出按钮组)',
                            value: 'react-native-general-actionsheet',
                            checked: false,
                        },
                    ],
                    default: [],
                },
                // react-native-syan-image-picker
            ]
            if (yesForAll) {
                let answers = utils.getPromptDefaultAnswer(prompts)
                // 不询问直接 resolve
                return Promise.resolve({
                    ...context,
                    metadata: {
                        ...answers,
                    },
                })
            }
            return inquirer.prompt(prompts).then(answers => {
                return {
                    ...context,
                    metadata: {
                        ...answers,
                    },
                }
            })
        })
        .then(async context => {
            // 遍历目标目录
            const list = glob.sync(projectName + '/*')

            // 当前已经有文件
            if (list.length) {
                return Promise.resolve(context)
            } else {
                console.log(logSymbols.info, chalk.green('安装预计需要 5-10 分钟,请耐心等待'))

                // 如果是空目录就初始化 react-native
                await execSh.promise('npx react-native init  ' + projectName).catch((res) => {
                    console.error(res)
                    console.error(logSymbols.error, chalk.red(`react-native 安装失败,程序退出`))
                    process.exit(1)
                })
                return Promise.resolve(context)
            }
        })
        .then(async context => {
            // git commit 保存一下

            // 这里改变 node 命令执行时所在的文件夹目录! 这里的改变很重要!!! 当前已经 cd 进入了目标目录
            shell.cd(projectName)

            let hasGit = fs.pathExistsSync('.git')
            // 没有 git 仓库
            if (!hasGit) {
                await execSh('git  init')
                await execSh('git  add .')
                await execSh('git commit -m init')
                console.error(logSymbols.success, chalk.green(`git 仓库创建完成`))
            }

            return Promise.resolve(context)
        })
        // 读取 package.json,修改内容
        .then(async context => {
            // console.log('context', context)

            let rnPkg = await fs.readJson(`./package.json`)

            // 替换 package.json 中的脚本
            rnPkg.scripts = packageMap.scripts

            // todo 安装各种插件,添加 -y 的命令行

            // 写入 json
            await fs.writeJson(`./package.json`, rnPkg, {
                spaces: 2,
            })
            let metadata = context.metadata
            let installDependenciesCmd = 'yarn add'

            // 必装依赖项
            let dependencies = packageMap.dependencies
            for (let depName in dependencies) {
                let version = dependencies[depName].replace(/\^/, '')
                if (!utils.isItInstalled(depName, rnPkg)) {
                    // 为防止出事,版本号都固定
                    installDependenciesCmd += ` ${depName}@${version} `
                }

            }

            // 可选依赖性,用户有选的插件才添加.
            let optionalDependencies = packageMap.optionalDependencies
            for (let depName in optionalDependencies) {
                let version = optionalDependencies[depName].replace(/\^/, '')

                if (metadata && metadata.dependencies && metadata.dependencies.includes(depName)) {
                    if (!utils.isItInstalled(depName, rnPkg)) {
                        // 为防止出事,版本号都固定
                        installDependenciesCmd += ` ${depName}@${version} `
                    }
                }
            }

            console.log(
                installDependenciesCmd,
            )
            console.log(
                // packageMap.dependencies
            )

            // console.log(rnPkg)


            // return Promise.reject('reject')

            // 如果有需要执行依赖安装命令
            installDependenciesCmd.length > 8 && await execSh.promise(installDependenciesCmd).catch((res) => {
                console.error(res)
                console.error(logSymbols.error, chalk.red(`插件依赖安装失败,程序退出`))
                process.exit(1)
            })

            return Promise.resolve(context)

            return Promise.reject('reject')

        })
        // 退回初始的命令执行目录
        .then(context => {
            shell.cd('..')
            return Promise.resolve(context)
        })
        // 删除临时文件夹，将文件移动到目标目录下
        .then(context => {
            return generator(context)
        })
        // 成功用绿色显示，给出积极的反馈
        .then(context => {
            console.log(chalk.green('创建成功:)'))
            console.log(chalk.green('cd ' + context.root + '\nyarn run android'))
        }).catch(err => {
        // 失败了用红色，增强提示
        console.log(err)
        console.error(logSymbols.error, chalk.red(`创建项目失败`))
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

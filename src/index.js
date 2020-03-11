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
var shell = require('shelljs');
const ora = require('ora')
const childProcess = require('child_process');

const execSh = require('./lib/exec-sh')
// 要创建的项目名
let projectName = ''

program
    .version('0.0.1', '-v, --version')
    .usage('test')
    .option('-C, --chdir [value]', '设置服务器节点', '/home/conan/server')
    .option('-c, --config [value]', '设置配置文件', './deploy.conf')
    .option('-m, --max <n>', '最大连接数', parseInt)
    .option('-s, --seed <n>', '出始种子', parseFloat)

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


if (!projectName) {  // project-name 必填
    // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
    program.help()
    return
}


const list = glob.sync('*')  // 遍历当前目录

let next = undefined

let rootName = path.basename(process.cwd())
if (list.length) {  // 如果当前目录不为空
    if (list.some(n => {
        const fileName = path.resolve(process.cwd(), n)
        const isDir = fs.statSync(fileName).isDirectory()
        return projectName === n && isDir
    })) {
        console.log(`项目${projectName}已经存在`)
        // remove(path.resolve(process.cwd(), projectName))

        // todo 询问是否移除
        // 备份
        // fs.emptyDir(path.resolve(process.cwd()))
        // remove(path.resolve(process.cwd(), projectName))


    }
    rootName = projectName
    next = Promise.resolve(projectName)
} else if (rootName === projectName) {
    rootName = '.'
    next = inquirer.prompt([
        {
            name: 'buildInCurrent',
            message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
            type: 'confirm',
            default: true,
        },
    ]).then(answer => {
        return Promise.resolve(answer.buildInCurrent ? '.' : projectName)
    })
} else {
    rootName = projectName
    next = Promise.resolve(projectName)
}

// let pp = fs.readFileSync(path.join(__dirname,'./cmder.js') )
//
// console.log(pp.toString())

// execSh('expo init AwesomeProject')
console.log(111111)

execSh('npx react-native init ttt')

console.log(222222222222)
return

next && go()

function go() {
    next
        .then(projectRoot => {
            if (projectRoot !== '.') {

                fs.mkdirSync(projectRoot)
            }
            // 仅测试,不用重复下载
            return {
                name: projectRoot,
                root: projectRoot,
                downloadTemp: path.join(__dirname, '../dist') ,
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
            return inquirer.prompt([
                {
                    name: 'projectName',
                    message: '项目的名称',
                    default: context.name,
                }, {
                    name: 'projectVersion',
                    message: '项目的版本号',
                    default: '1.0.0',
                }, {
                    name: 'projectDescription',
                    message: '项目的简介',
                    default: `A project named ${context.name}`,
                }, {
                    name: 'supportMacawAdmin',
                    message: '开启登陆模块',
                    default: "No",
                },
            ]).then(answers => {
                let v = answers.supportMacawAdmin.toUpperCase()
                answers.supportMacawAdmin = v === "YES" || v === "Y"
                return {
                    ...context,
                    metadata: {
                        ...answers,
                    },
                }
            })
        })
        .then(context => {
            //删除临时文件夹，将文件移动到目标目录下
            return generator(context)
        })
        .then(context => {
            // 成功用绿色显示，给出积极的反馈
            console.log(chalk.green('创建成功:)'))
            console.log(chalk.green('cd ' + context.root + '\nnpm install\nnpm run dev'))
        })
        .catch(err => {
            // 失败了用红色，增强提示
            console.log(err)
            console.error(chalk.red(`创建失败：${err.message}`))
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

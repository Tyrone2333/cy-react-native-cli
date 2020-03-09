/**
 * Created by en20 on 2020/3/9.
 */
const inquirer = require('inquirer')
// Node colorful always

const questions = [
    {
        name: 'conf',
        type: 'confirm',
        message: '建议上线前选择全部测试用例（默认为测试全部）',
    },
    // 不知道怎么正常用
    // {
    //     name: 'project',
    //     message: 'Please input the project name which you want to check:',
    //     filter: src => src.replace(/.spec.ts$/gi, ''),
    //     validate: str => Boolean(str.split('/').length === 2 || str.split('/').length === 3),
    //     when: res => !Boolean(res.conf),
    // },
    {
        type: 'list',
        name: 'project',
        message: '请选择你的咖啡:',
        choices: ['中杯', '大杯', '超大杯', new inquirer.Separator(), "**"],
    },
    {
        type: 'checkbox',
        name: 'checkbox',
        message: '请选择需要集成的插件:',
        choices: ['中杯', '大杯', '超大杯', new inquirer.Separator('-- 分割线 --'), "**"],
        default: ['大杯'],
    },
    {

        type: 'expand',
        name: 'expand',
        message: 'expand:',
        // 同样是生成列表，但是在choices属性中需要增加一个属性：key，这个属性用于快速选择问题的答案。类似于alias或者shorthand的东西。同时这个属性值必须为一个小写字母
        choices: [
            {
                // key 必须是单个字母
                key: 'y',
                name: 'Overwrite',
                value: 'overwrite'
            },
            {
                key: 'o',
                name: 'Overwrite this one and all next',
                value: 'overwrite_all'
            },
            {
                key: 'd',
                name: 'Show diff',
                value: 'diff'
            },
            {
                key: 'x',
                name: 'Abort',
                value: 'abort'
            }
        ],
        default: 'y',
    },
]

const prompts = () => new Promise(resolve => {
    inquirer.prompt(questions).then((params) => {

        // 这里可以初步处理

        resolve({
            params,
        })
    })
})


prompts().then(({params}) => {

    console.log(params)
})


return

// 问题 confirm
inquirer.prompt([{
    type: 'confirm',
    name: 'test',
    message: 'Are you handsome?',
    default: true,
}]).then((answers) => {
    // todo 怎么把结果传递下去呢
    console.log('结果为:')
    console.log(answers)
    return inquirer.prompt([{
        type: 'confirm',
        name: 'test2',
        message: 'Are you handsome222222222222?',
        default: true,
    }])
}).then((answers) => {
    console.log('结果为:')
    console.log(answers)
})



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

// 复制文件
function copyTemplate(from, to) {
    from = path.join(__dirname, 'templates', from)
    console.log(from)
    write(to, fs.readFileSync(from, 'utf-8'))
}

function write(path, str, mode) {
    fs.writeFileSync(path, str)
}

// 新建目录
function mkdir(path, fn) {
    fs.mkdir(path, function (err) {
        fn && fn()
    })
}



// Async with promises:
fs.copy('./templates/react-native', './temp')
    .then(() => console.log('success!'))
    .catch(err => console.error(err))

console.log('bb')

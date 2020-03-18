/**
 * Created by en20 on 2020/3/17.
 */
var http = require('http')
var path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

// npm 仓库地址: "http://registry.npmjs.org/cy-react-native-cli"

http.get("http://registry.npmjs.org/cy-react-native-cli", (res) => {
    const {statusCode} = res
    const contentType = res.headers['content-type']

    let error
    if (statusCode !== 200) {
        error = new Error('请求失败\n' +
            `状态码: ${statusCode}`)
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('无效的 content-type.\n' +
            `期望的是 application/json 但接收到的是 ${contentType}`)
    }
    if (error) {
        console.error(error.message)
        // 消费响应数据来释放内存。
        res.resume()
        return
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => {
        rawData += chunk
    })
    res.on('end', async () => {
        try {
            const parsedData = JSON.parse(rawData)
            // console.log(parsedData)

            const packageJson = await fs.readJson(path.join(__dirname, '../../package.json'))

            let remoteVersion = parsedData['dist-tags'].latest
            let localVersion = packageJson.version
            // 远程的版本号更大
            if (compare(remoteVersion, localVersion)) {
                console.log(`
**********************************************************************************

    发现新版本,请执行 ${chalk.green('npm update cy-react-native-cli -g')} 更新: ${localVersion} ==> ${chalk.green(remoteVersion)}
    
**********************************************************************************
                `)
                // 不更新就不给用:>
                process.exit(0)
            }

        } catch (e) {
            console.error(e.message)
        }
    })
}).on('error', (e) => {
    console.error(`出现错误: ${e.message}`)
})

/*
 * 版本号比较方法
 * 传入两个字符串，当前版本号：curV；比较版本号：reqV
 * 调用方法举例：compare("1.1","1.2")，将返回false
 */
function compare(curV, reqV) {
    if (curV && reqV) {
        //将两个版本号拆成数字
        var arr1 = curV.split('.'),
            arr2 = reqV.split('.')
        var minLength = Math.min(arr1.length, arr2.length),
            position = 0,
            diff = 0
        //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
        while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
            position++
        }
        diff = (diff != 0) ? diff : (arr1.length - arr2.length)
        //若curV大于reqV，则返回true
        return diff > 0
    } else {
        //输入为空
        console.log("版本号不能为空")
        return false
    }
}

/**
 * Created by en20 on 2020/3/12.
 */

module.exports.getPromptDefaultAnswer = prompts => {
    if ('[object Array]' === Object.prototype.toString.call(prompts)) {
        const answers = {
        }

        for (const item of prompts) {
            const val = item.default
            // val = val === 'No' ? false : val
            answers[item.name] = val
        }

        return answers
    }

    throw new Error('prompt 格式错误')
}

// 检查包是否已经在 package.json 中安装
module.exports.isItInstalled = function(pkg, packageJsonObj) {
    // eslint-disable-next-line no-nested-ternary
    return packageJsonObj.devDependencies[pkg]
        ? 'devDependencies'
        : packageJsonObj.dependencies[pkg]
            ? 'dependencies'
            : null
}

module.exports.sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

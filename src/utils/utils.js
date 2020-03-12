/**
 * Created by en20 on 2020/3/12.
 */

module.exports.getPromptDefaultAnswer = (prompts) => {

    if(`[object Array]` === Object.prototype.toString.call(prompts)){
        let answers = {}
        for (const item of prompts) {
            let val = item.default
            // val = val === 'No' ? false : val
            answers[item.name] = val
        }
        return answers
    } else {
        throw new Error('prompt 格式错误')
    }
}
module.exports. sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

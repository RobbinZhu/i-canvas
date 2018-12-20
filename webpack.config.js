const path = require('path')

const isWechat = process.env.NODE_ENV == 'wechat'

const entry = ['./biz/test.js']
if (isWechat) {
    entry.unshift('./weapp-adapter.js')
}
const outputName = isWechat ? 'game.js' : 'game2d.js'
const outputPath = isWechat ? path.resolve(__dirname, './wechat') : path.resolve(__dirname, './dist')
const mode = process.env.NODE_ENV == 'dev' ? 'production' : 'production'
// console.log(entry, outputName, outputPath, mode)

module.exports = {
    entry: {
        entry: entry
    },
    output: {
        filename: outputName,
        path: outputPath
    },
    plugins: [],
    stats: {
        colors: true
    },
    node: {
        Buffer: false
    },
    mode: mode
}
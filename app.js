const Koa = require('koa');
const Static = require('koa-static');

new Koa()
    .use(Static(__dirname))
    .use(Static(__dirname + '/wechat'))
    .listen(8765);
console.log('app listening on port %d', 8765);
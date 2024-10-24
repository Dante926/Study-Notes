const Koa = require('koa');

const app = new Koa();
const router = require('./router/index')

app.use(router.routes())

app.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
})
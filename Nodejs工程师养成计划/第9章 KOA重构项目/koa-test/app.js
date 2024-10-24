const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    // koa把req和res封装成了ctx
    ctx.body = 'Hello World';
    
    console.log(ctx.req.method);
    console.log(ctx.req.url);
    console.log(ctx.req.headers);
    
});

app.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
});
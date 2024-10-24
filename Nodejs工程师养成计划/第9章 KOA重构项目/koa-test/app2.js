const Koa = require('koa');
const app = new Koa();

/* app.use(async (ctx,next) => {
    console.log('one-1');
    console.log('one-2');
    next();
});

app.use(async (ctx,next) => {
    console.log('two-1');
    console.log('two-2');
}); */

/* app.use(async (ctx, next) => {
    console.log('one-1');
    next();
    console.log('one-2');

})
.use(async (ctx, next) => {
    console.log('two-1');
    next();
    console.log('two-2');
})
.use(async (ctx, next) => {
    console.log('three-1');
    next();
    console.log('three-2');
}); */

app.use(async (ctx, next) => {
    console.log('one-1');
    next();
    console.log('one-2');
})
    .use(async (ctx, next) => {
        await console.log('two-1');
        // 由于是异步操作，当await执行后会认为当前中间件已经执行完毕，就会返回上一层中间件
        next();
        await console.log('two-2');
    })
    .use(async (ctx, next) => {
        console.log('three-1');
        next();
        console.log('three-2');
    });

app.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
});
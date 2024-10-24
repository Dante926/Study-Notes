const Koa = require('koa');
const app = new Koa();

const Router = require('@koa/router');
const router = new Router();

/* app.use(async (ctx, next) => {
    console.log(ctx.path);
    // 1 由于koa是轻量化的，所以已经剔除了express中的route，可以使用其他中间件实现
    if (ctx.path === '/') {

    } else if (ctx.path === '/index') {
        await next();
    }
})
 */

// 2 使用koa/router
router.get('/user', async (ctx, next) => {
    ctx.body = 'user';
})
// router.post()

app.use(router.routes())
app.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
});
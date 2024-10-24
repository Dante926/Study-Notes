const Router = require('@koa/router');

const router = new Router({prefix: '/api/v1'});

router.get('/user', ctx => {
    ctx.body = 'user'
})

router.get('/vedio', ctx => {
    ctx.body = 'vedio'
})

module.exports = router;
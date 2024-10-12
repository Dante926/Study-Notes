const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async function (req, res) {
    try {
        let back = await db.getDb()
        res.send(back.users)
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.post('/', async (req, res) => {
    let body = req.body
    if (!body) {
        res.status(403).json({
            error: '数据为空'
        })
    }
    let jsonObj = await db.getDb()
    body.id = jsonObj.users[jsonObj.users.length - 1].id + 1
    jsonObj.users.push(body)
    try {
        const w = await db.serveDb(jsonObj)
        console.log(w);

        if (!w) {
            res.send('写入成功')

        } else {
            res.status(500).json({
                error: '写入文件失败'
            })
        }
    } catch {
        res.status(500).json({
            error: '写入文件失败'
        })
    }
})

app.put('/:id', async (req, res) => {
    /*     
        console.log(req.params);
        console.log(req.body); 
    */
    try {
        const userinfo = await db.getDb()
        const UserId = Number.parseInt(req.params.id)
        const user = userinfo.users.find(item => item.id === UserId)
        if (!user) {
            res.status(403).json({
                error: '用户不存在'
            })
        } else {
            user.username = req.body.username;
            user.age = req.body.age;
            console.log(userinfo);

            const w = await db.serveDb(userinfo)
            if (!w) {
                console.log('更新成功');

                res.status(201).json({
                    msg: '修改成功'
                })
            } else {
                console.log('写入错误');
            }
        }
    } catch {

    }
})

app.listen(3000, () => {
    console.log('server is running at http://127.0.0.1:3000');
})
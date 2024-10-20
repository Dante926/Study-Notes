const express = require('express')
const router = express.Router()
const videoHandler = require('../router_handler/video')
const { verifyToken } = require('../util/jwt')
const { videoValidator } = require('../middleware/validator/videoValidator')


router
    .get('/credentials', verifyToken, videoHandler.credential)
    .post('/createvideos', verifyToken, videoValidator, videoHandler.createvideo)

module.exports = router
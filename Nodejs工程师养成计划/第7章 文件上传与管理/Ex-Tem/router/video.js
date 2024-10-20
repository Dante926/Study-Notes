const express = require('express')
const router = express.Router()
const videoHandler = require('../router_handler/video')


router
    .post('/credentials', videoHandler.credential)

module.exports = router
const express = require('express')
const router = express.Router()
const videoHandler = require('../router_handler/video')


router
    .get('/credentials', videoHandler.credential)

module.exports = router
const express = require('express')
const router = express.Router()

router.get('/mp3', (req, res) => {
  res.send('mp3')
})

module.exports = router
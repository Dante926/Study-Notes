const express = require('express')
const router = express.Router()

router.get('/admin', (req, res) => {
  res.send('admin')
})

module.exports = router
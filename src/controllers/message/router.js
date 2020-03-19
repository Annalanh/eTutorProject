const express = require('express')
const router = express.Router()
const messageController = require("./controller")

router.get('/m', messageController.findAllGroupChat)
      

module.exports = router
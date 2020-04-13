const express = require('express')
const router = express.Router()
const emailController = require("./controller")

router.get('/sendTest', emailController.sendTest)

module.exports = router

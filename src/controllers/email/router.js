const express = require('express')
const router = express.Router()
const emailController = require('./controller')
const {isStaff} = require('../../utils/checkRole')

router.post('/sendNotificationEmail', emailController.sendNoti)

module.exports = router
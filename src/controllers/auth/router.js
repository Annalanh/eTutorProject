const express = require('express')
const router = express.Router()
const authController = require("./controller")

router.get('/login', authController.loginPage)
      .post('/login', authController.login)
      .get('/logout', authController.logout)
      

module.exports = router
const express = require('express')
const router = express.Router()
const userController = require("./controller")

router.get('/getAll', userController.getAll)
      .get('/getOne/:id', userController.getOne)
      .get('/add', userController.createNewUser)
      

module.exports = router
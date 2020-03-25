const express = require('express')
const router = express.Router()
const classRoomController = require("./controller")

router.post('/findClassRoomsByUserId', classRoomController.findClassRoomsByUserId)


module.exports = router

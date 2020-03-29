const express = require('express')
const router = express.Router()
const classRoomController = require("./controller")

router.post('/findClassRoomsByUserId', classRoomController.findClassRoomsByUserId)
      .post('/findPeopleByClassId', classRoomController.findPeopleByClassId)


module.exports = router

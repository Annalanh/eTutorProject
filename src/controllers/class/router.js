const express = require('express')
const router = express.Router()
const classRoomController = require("./controller")

router.get('/getAll', classRoomController.getAllClasses)
      .post('/add', classRoomController.createNewClass)
      .post('/delete', classRoomController.deleteClassById)
      .post('/addStudents', classRoomController.addStudentsToClass)
      .post('/update', classRoomController.updateClass)

module.exports = router
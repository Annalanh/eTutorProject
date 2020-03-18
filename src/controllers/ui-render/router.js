const express = require('express')
const router = express.Router()
const renderUIController = require("./controller")
const { isAdmin, isStaff, isTutor, isStudent, isStudentOrTutor } = require('../../utils/checkRole')

router.get('/dashboard', renderUIController.renderDashboardPage)
      .get('/chat', renderUIController.renderChatPage)
      .get('/class', isStudentOrTutor, renderUIController.renderClassPage)
      

module.exports = router

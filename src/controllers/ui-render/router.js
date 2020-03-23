const express = require('express')
const router = express.Router()
const renderUIController = require("./controller")
const { isAdmin, isStaff, isTutor, isStudent, isStudentOrTutor } = require('../../utils/checkRole')

router.get('/dashboard', renderUIController.renderDashboardPage)
      .get('/chat', renderUIController.renderChatPage)
      .get('/class', isStudentOrTutor, renderUIController.renderClassPage)
      .get('/staffManagement', isAdmin, renderUIController.renderStaffManaPage)
      .get('/staffDashboard', isAdmin, renderUIController.renderStaffDashboardPage)
      

module.exports = router

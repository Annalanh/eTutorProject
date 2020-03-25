const { User, ClassRoom } = require('../../config/sequelize')
class classRoomController{
    findClassRoomsByUserId(req, res){
        let userId = req.body.userId
        let role = req.body.role
        
        if(role == 'staff'){
            User.findOne({
                where: {id: userId},
                include: [
                    {
                        model: ClassRoom,
                        as: "StaffClass"
                    }
                ]
            }).then(staff => {
                let classRooms = staff.StaffClass
                res.send(classRooms)
            })
        }else if(role == 'tutor'){
            User.findOne({
                where: {id: userId},
                include: [
                    {
                        model: ClassRoom,
                        as: "TutorClass"
                    }
                ]
            }).then(tutor => {
                let classRooms = tutor.TutorClass
                res.send(classRooms)
            })
        }else if(role == 'student'){
            User.findOne({
                where: {id: userId},
                include: [
                    {
                        model: ClassRoom
                    }
                ]
            }).then(student => {
                let classRooms = student.ClassRooms
                res.send(classRooms)
            })
        }

    }
}

module.exports = new classRoomController()
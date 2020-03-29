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
                        as: "TutorClass",
                        include: [
                            {
                                model: User, 
                                as: "Staff"
                            }
                        ]
                    }
                ]
            }).then(tutor => {
                let tutorName = tutor.name
                let tutorId = tutor.id 
                let classRooms = tutor.TutorClass
                let classRoomData = []

                classRooms.forEach(classRoom => {
                    let classId = classRoom.id
                    let className = classRoom.name
                    let staffId = classRoom.StaffId
                    let staffName = classRoom.Staff.name

                    classRoomData.push({ classId, className, tutorId, staffId, staffName, tutorName })

                })
                res.send(classRoomData)

            })
        }else if(role == 'student'){
            User.findOne({
                where: {id: userId},
                include: [
                    {
                        model: ClassRoom,
                        include: [
                            {
                                model: User, 
                                as: "Staff"
                            },
                            {
                                model: User,
                                as: "Tutor"
                            }
                        ]
                    }
                ]
            }).then(student => {
                let classRooms = student.ClassRooms
                let classRoomData = []

                classRooms.forEach(classRoom => {
                    let classId = classRoom.id
                    let className = classRoom.name
                    let tutorId = classRoom.TutorId
                    let staffId = classRoom.StaffId
                    let tutorName = classRoom.Tutor.name
                    let staffName = classRoom.Staff.name

                    classRoomData.push({ classId, className, tutorId, staffId, tutorName, staffName})
                })

                res.send(classRoomData)
            })
        }

    }
    findPeopleByClassId(req, res){
        let { classId } = req.body
        ClassRoom.findOne({
            where: {id : classId},
            include: [
                {model: User, as: "Tutor"},
                {model: User, as: "Staff"},
                {model: User, as: "Students"}
            ]
        }).then(foundClass => {
            if(foundClass){
                let studentList = []
                
                foundClass.Students.forEach(student => {
                    studentList.push({
                        id: student.id,
                        name: student.name,
                        fullname: student.fullname,
                        email: student.email
                    })
                })
                let classPeople = {
                    tutor: { id: foundClass.Tutor.id, name: foundClass.Tutor.name, email: foundClass.Tutor.email, fullname: foundClass.Tutor.fullname },
                    staff: { id: foundClass.Staff.id, name: foundClass.Staff.name, email: foundClass.Staff.email, fullname: foundClass.Staff.fullname },
                    students: studentList
                }

                res.send({status: true, classPeople})
            }else{
                res.send({status: false, message: "No class found!"})
            }
        })
    }
}

module.exports = new classRoomController()
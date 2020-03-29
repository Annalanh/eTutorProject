const { User, ClassRoom } = require('../../config/sequelize')
class classRoomController {
    getAllClasses(req, res) {
        ClassRoom.findAll({
            include: [{
                model: User,
                as: 'Tutor',
            },
            {
                model: User,
                as: 'Staff',
            },
            {
                model: User,
                as: 'Students'
            }]
        }).then((classes) => {
            if (classes) res.send({ status: true, classes })
            else res.send({ status: false, message: 'no class found' })
        });
    }

    createNewClass(req, res) {
        let { className, tutorId, staffId } = req.body;
        ClassRoom.findOne({
            where: {
                name: className,
                TutorId: tutorId,
                StaffId: staffId
            }
        }).then(classFound => {
            if (classFound) res.send({ status: false, message: 'Class already existed!' })
            else {
                ClassRoom.create({
                    name: className,
                    TutorId: tutorId,
                    StaffId: staffId
                }).then(classCreated => {
                    if (classCreated) {
                        res.send({ status: true, message: "class created!" })
                    }
                    else {
                        res.send({ status: false, message: "cannot create class!" })
                    }
                })
            }
        })
    }

    deleteClassById(req, res) {
        let { classId } = req.body;
        ClassRoom.destroy({
            where: { id: classId }
        }).then(deleted => {
            if (deleted) {
                res.send({ status: true, message: "class deleted!" })
            }
            else {
                res.send({ status: false, message: "cannot delete class!" })
            }
        })
    }

    addStudentsToClass(req, res) {
        const studentIds = req.body["studentIds[]"];
        const { classId } = req.body;
        User.findAll({
            where: {
                id: studentIds
            }
        }).then(students => {
            if (!students) res.send({status: false, mesage: 'cannot find student'})
            ClassRoom.findOne({ where: { id: classId } })
                .then((classRoom => {
                    if (!classRoom) res.send({status: false, message: 'cannot find classroom'})
                    classRoom.addStudents(students);
                    res.send({status: true, message: 'success!'})
                }))
        })
    }

    updateClass(req, res) {
        let { className, tutorId, staffId, classId } = req.body;
        ClassRoom.findOne({
            where: {
                name: className,
                TutorId: tutorId,
                StaffId: staffId
            }
        }).then(classFound => {
            if (classFound) res.send({ status: false, message: 'Class already existed!' })
            else {
                ClassRoom.update({
                    name: className,
                    TutorId: tutorId,
                    StaffId: staffId
                }, {
                    where: { id: classId }
                }).then(classCreated => {
                    if (classCreated) {
                        res.send({ status: true, message: "class created!" })
                    }
                    else {
                        res.send({ status: false, message: "cannot update class!" })
                    }
                })
            }
        })
    }
}

module.exports = new classRoomController()
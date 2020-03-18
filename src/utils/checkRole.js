function isAdmin(req, res, next){
    let roleId = req.session.user.roleId
    if(roleId == 1) next()
    else res.send('authorized')
}
function isStaff(req, res, next){
    let roleId = req.session.user.roleId
    if(roleId == 2) next()
    else{
        res.render('401-error', {
            title: 'Etutoring',
            layout: false
        })
    }
}
function isTutor(req, res, next){
    let roleId = req.session.user.roleId
    if(roleId == 3) next()
    else{
        res.render('401-error', {
            title: 'Etutoring',
            layout: false
        })
    }
}
function isStudent(req, res, next){
    let roleId = req.session.user.roleId
    if(roleId == 4) next()
    else{
        res.render('401-error', {
            title: 'Etutoring',
            layout: false
        })
    }
}
function isStudentOrTutor(req, res, next){
    let roleId = req.session.user.roleId
    if(roleId == 3 || roleId == 4) next()
    else{
        res.render('401-error', {
            title: 'Etutoring',
            layout: false
        })
    }
}

module.exports = {
    isAdmin,
    isStaff,
    isTutor,
    isStudent,
    isStudentOrTutor
}
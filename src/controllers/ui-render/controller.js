class UIRender{
    renderDashboardPage(req, res){
        let currentUserRole = req.session.user.role

        if(currentUserRole == 'admin'){
            res.render('admin-dashboard', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: ['../js/et-pages/admin-dashboard.js'],
                layout: 'main'
            })
        }else if(currentUserRole == 'staff'){
            res.render('staff-dashboard', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: ['../js/et-pages/staff-dashboard.js'],
                layout: 'main'
            })
        }else if(currentUserRole == 'tutor'){
            res.render('tutor-dashboard', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: [],
                layout: 'main'
            })
        }else if(currentUserRole == 'student'){
            res.render('student-dashboard', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: [],
                layout: 'main'
            })
        }else{
            res.send({status: false})
        }
    }
    renderChatPage(req, res){
        res.render('chat', {
            title: 'Etutoring',
            thisPageStyleSheets: ['../css/et-pages/chat.css'], 
            thisPageScripts: ['../js/et-pages/chat.js'],
            layout: 'main'
        })
    }
    renderClassPage(req, res){
        res.send('welcome to class 1605')
    }
    renderStaffManaPage(req, res){
        res.render('admin-staff-mana', {
            title: 'Etutoring',
            thisPageStyleSheets: [], 
            thisPageScripts: [],
            layout: 'main'
        })
    }
    renderStaffDashboardPage(req, res){
        res.render('admin-staff-dashboard', {
            title: 'Etutoring',
            thisPageStyleSheets: [], 
            thisPageScripts: [],
            layout: 'main'
        })
    }
    renderStudentManaPage(req, res) {
        res.render('staff-student-mana', {
            title: 'Etutoring',
            thisPageScripts: ['../js/et-pages/staff-student-mana.js'],
            thisPageStyleSheets: [],
            layout: 'main'
        })
    }
    renderClassManaPage(req, res){
        res.render('staff-class-mana', {
            title: 'Etutoring',
            thisPageScripts: ['../js/et-pages/staff-class-mana.js'],
            thisPageStyleSheets: [],
            layout: 'main'
        })
    }
    renderClassStudentManaPage(req, res){
        res.render('class-student-mana', {
            title: 'Etutoring',
            thisPageScripts: ['../js/et-pages/class-student-mana.js'],
            thisPageStyleSheets: [],
            layout: 'main'
        })
    }
}
module.exports = new UIRender()
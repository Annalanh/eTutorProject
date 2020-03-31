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
                thisPageScripts: ['../js/et-pages/tutor-dashboard.js'],
                layout: 'main'
            })
        }else if(currentUserRole == 'student'){
            res.render('student-dashboard', {
                title: 'Etutoring',
                thisPageStyleSheets: [], 
                thisPageScripts: ['../js/et-pages/student-dashboard.js'],
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
            thisPageStyleSheets: ['../css/et-pages/admin-staff-mana.css'], 
            thisPageScripts: ['../js/et-pages/admin-staff-mana.js'],
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
    renderClassStreamPage(req, res){
        res.render('class-stream', {
            title: 'Etutoring',
            thisPageStyleSheets: ['../../css/pages/todo/todo.css'], 
            thisPageScripts: ['../../js/et-pages/class-stream.js'],
            layout: 'class'
        })
    }
    renderClassListPage(req, res){
        res.render('class-list', {
            title: 'Etutoring',
            thisPageStyleSheets: [], 
            thisPageScripts: ['../js/et-pages/class-list.js'],
            layout: 'main'
        })   
    }
    renderManagementPage(req, res){
        res.render('management', {
            title: 'Etutoring',
            thisPageStyleSheets: [], 
            thisPageScripts: ['../js/et-pages/management.js'],
            layout: 'main'
        })   
    }
    renderClassPeoplePage(req, res){
        res.render('class-people', {
            title: 'Etutoring',
            thisPageStyleSheets: ['../../css/et-pages/class-people.css'], 
            thisPageScripts: ['../../js/et-pages/class-people.js'],
            layout: 'class'
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
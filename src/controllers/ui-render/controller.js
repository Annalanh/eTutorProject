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
                thisPageScripts: [],
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
}
module.exports = new UIRender()
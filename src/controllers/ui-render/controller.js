class UIRender{
    renderDashboardPage(req, res){
        res.render('dashboard', {
            title: 'Etutoring',
            thisPageStyleSheets: [], 
            thisPageScripts: [],
            layout: 'main'
        })
    }
    renderChatPage(req, res){
        res.render('chat', {
            title: 'Etutoring',
            thisPageStyleSheets: [], 
            thisPageScripts: ['../js/et-pages/chat.js'],
            layout: 'main'
        })
    }
    renderClassPage(req, res){
        res.send('welcome to class 1605')
    }
}
module.exports = new UIRender()
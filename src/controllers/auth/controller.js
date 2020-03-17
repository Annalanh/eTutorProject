const userListFake = [
    {
        id: 1,
        username: "ThaoGum",
        password: 123123
    },
    {
        id: 2,
        username: "TuanAnh",
        password: 456456
    },
    {
        id: 3,
        username: "MinhThang",
        password: 789789
    }
]
class Authentication {
    loginPage(req, res) {
        if (req.session.userId) {
            res.redirect('/')
        } else {
            res.render('login', {
                title: "Etutoring",
                thisPageStyleSheets: ['../css/pages/login/login-1.css'], 
                thisPageScripts: ['../js/et-pages/login.js'],
                layout: 'auth'
            })
        }
    }
    login(req, res) {
        let username = req.body.username
        let password = req.body.password

        let userFound = userListFake.find(user => user.username == username && user.password == password)

        if (userFound) {
            req.session.userId = userFound.id
            res.send({ status: true, message: 'succeed' })
        } else {
            res.send({ status: false, message: 'fail' })
        }
    }
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) console.log(err)
            res.clearCookie('sessionId')
            res.redirect('/login')
        });
    }
}
module.exports = new Authentication()

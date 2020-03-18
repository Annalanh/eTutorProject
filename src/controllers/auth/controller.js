const userListFake = [
    {
        id: 1,
        username: "ThaoGum",
        password: '$2b$10$Do4IEwPZ.YGpzKCufkHoweT9dJr.azVtPD8wU.GvQxHGuQ2SSzWC6',
        role: 1
    },
    {
        id: 2,
        username: "TuanAnh",
        password: '$2b$10$NcngsHkUvQRR04fYF3r.veLAZjRHTGENAxiHsonQT7o6Wcxcl6DMW',
        role: 3
    },
    {
        id: 3,
        username: "MinhThang",
        password: '$2b$10$9Xs7SFIl5yRlL6naTkgVJu4qqvmmpCv7UMdtvRFSmB8nHFt7jPRKG',
        role: 4
    }
]

const bcrypt = require('bcrypt')
const saltRounds = 10;

class Authentication {
    renderLoginPage(req, res) {
        if (req.session.user) {
            res.redirect('/dashboard')
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

        let userFound = userListFake.find(user => user.username == username && bcrypt.compareSync(password, user.password))

        if (userFound) {
            req.session.user = {
                userId: userFound.id,
                roleId: userFound.role
            }
            res.send({ status: true, message: 'succeed' })
        } else {
            res.send({ status: false, message: 'fail' })
        }
    }
    logout(req, res) {
        req.session.destroy(() => {
            res.clearCookie('sessionId')
            res.send({status: true})
        });
    }
}
module.exports = new Authentication()

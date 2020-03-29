const { User, ClassRoom } = require('../../config/sequelize')
const { Sequelize } = require('../../config/sequelize')
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserController {
    createNewUser(req, res){
        let { userName, password, role, email } = req.body

        User.findOne({
            where: Sequelize.or(
                {name: userName},
                {email: email}
            )
        }).then(userFound => {
            if(userFound) res.send({status: false, message: 'Username or email has already existed !'})
            else{  
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        User.create({
                            name: userName,
                            password: hash,
                            role,
                            email
                        }).then((userCreated) => {
                            if(userCreated){
                                res.send({status: true, message:"User created !"})
                            }else{
                                res.send({status: false, message:"Cannot create user!"})
                            }
                        })
                    });
                });
            }
        })
    }

    updateUser(req, res){
        let { userName, email, password, role, userId } = req.body

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                User.update({
                    name: userName,
                    email,
                    password: hash,
                    role
                }, {
                    where: { id: userId }
                }).then(user => {
                    if(user[0] == 1) res.send({status: true, message:"User updated!"})
                    else res.send({status:false, message: "Update error!"})
                })
            });
        });
    }

    deleteUserById(req, res){
        let { userId } = req.body

        User.destroy({
            where: { id: userId }
        }).then(deleted => {
            if(deleted){
                res.send({status: true, message: 'User deleted !'})
            }else{
                res.send({status: false, message: 'Cannot delete user !'})
            }
        })
    }

    getAllUser(req, res){
        User.findAll()
            .then(users => {
                res.send({status: true, users})
            })
            .catch(err =>{
                console.log(err)
                res.send({status: false, message: "error"})
            });
    }

    findUserById(req, res){
        console.log(req.body);
        User.findOne({
            where: {id: req.body.userId }
        }).then(user => {
            if(user) res.send({status: true, user})
            else res.send({status: false, message:"no user found"})
        })
    }

    findUserByName(req, res){
        let userName = req.body.userName

        User.findOne({
            where: {
                name: userName
            }
        }).then(user => {
            if(user){
                let userId = user.dataValues.id
                res.send({status: true, userId})
            }else{
                res.send({status: false})
            }
        })
    }

    findUsersByRole(req, res){
        let userRole = req.body.userRole

        User.findAll({
            where: {
                role: userRole
            }
        }).then(users => {
            if (users){
                res.send({status: true, users})
            }else{
                res.send({status: false})
            }
        })
    }
}
module.exports = new UserController()
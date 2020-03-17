const { UserModel } = require('../../config/database')
class User {
    /*CRUD */
    //CREATE
    createNewUser(req, res){
        UserModel.findOrCreate({where: {email: 'ptuananh196@gmail.com'}, defaults: {name:'null'}})
        .spread((user, created) =>{
            console.log(user);
            if (created){
                res.redirect('/getAll');
            }
        })
    }
    //READ
    getAll(req, res){
        UserModel.findAll()
            .then(users => {
                console.log("Users: " + users);
                res.sendStatus(200);
            })
            .catch(err => console.log("err: " + err));
    }
    getOne(req,res){
        return 0;
    }
    //UPDATE
    //DELETE
}
module.exports = new User()
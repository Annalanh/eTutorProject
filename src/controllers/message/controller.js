const { User, GroupChat, Message } = require('../../config/sequelize')
class MessageController{
    findAllGroupChat(req, res){
        GroupChat.findOne({
            where: { id: '1' },
            include: {
                model: Message
            }
        })
        .then((group) => console.log(group.dataValues.Messages))
    }
}
module.exports = new MessageController()
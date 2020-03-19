const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const userModel = require('../models/User')
const classModel = require('../models/ClassRoom')
const meetingModel = require('../models/Meeting')
const fileModel = require('../models/File')
const postModel = require('../models/Post')
const commentModel = require('../models/Comment')
const groupChatModel = require('../models/GroupChat')
const messageModel = require('../models/Message')
dotenv.config();
/**
 * database connection
 */

const sequelize = new Sequelize(process.env['DB_NAME'], process.env['PG_ADMIN'], process.env['PG_PASSWORD'], {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }
);

const User = userModel(sequelize, Sequelize)
const ClassRoom = classModel(sequelize, Sequelize)
const Meeting = meetingModel(sequelize, Sequelize)
const File = fileModel(sequelize, Sequelize)
const Post = postModel(sequelize, Sequelize)
const Comment = commentModel(sequelize, Sequelize)
const GroupChat = groupChatModel(sequelize, Sequelize)
const Message = messageModel(sequelize, Sequelize)

//ClassRoom have exactly 1 staff and 1 tutor
ClassRoom.hasOne(User, { as: 'Tutor', foreignKey: 'TutorId' })
ClassRoom.hasOne(User, { as: 'Staff', foreignKey: 'StaffId' })

//Many-to-Many association StudentClassRoom
ClassRoom.belongsToMany(User, { as: 'Students', through: 'Students_ClassRooms', foreignKey: 'classId' })
User.belongsToMany(ClassRoom, { through: 'Students_ClassRooms', foreignKey: 'studentId' })

//Each meeting is for 1 class
ClassRoom.hasMany(Meeting, { foreignKey: 'classId' })

//file registered by an user and belongs to specific class
File.belongsTo(ClassRoom)
File.belongsTo(User)

//Post is posted by specific user and belongs to specific class
Post.belongsTo(ClassRoom)
Post.belongsTo(User)

//Comment belongs to a post and written by an user
Comment.belongsTo(User)
Comment.belongsTo(Post)

//Message belongs to a group and sended by an user
Message.belongsTo(User)
Message.belongsTo(GroupChat)

//Many-toMany association GroupsMembers
GroupChat.belongsToMany(User, { as: 'Members', through: 'Groups_Members', foreignKey: 'memberId' })
User.belongsToMany(GroupChat, { through: 'Groups_Members', foreignKey: 'groupId' })

/**
 * sync database
 */
sequelize.sync({ force: true})
.then(() => {
  console.log('Database & table created')
})


module.exports = {
  User
}
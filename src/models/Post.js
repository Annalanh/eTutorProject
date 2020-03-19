module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Post',{
        content: { type: Sequelize.STRING }
    })
}
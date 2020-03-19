module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Meeting',{
        name: { type: Sequelize.STRING },
        duration: { type: Sequelize.TIME },
        datetime: { type: Sequelize.DATE }
    })
}
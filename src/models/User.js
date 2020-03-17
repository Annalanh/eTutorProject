module.exports = (sequelize, Sequelize) => {
    return sequelize.define('User', {
        name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING }
    })
}

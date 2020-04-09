module.exports = (sequelize, Sequelize) => {
    return sequelize.define('User', {
        name: { type: Sequelize.STRING },
        fullname: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING, unique: true },
        password: { type: Sequelize.STRING },
        year: { type: Sequelize.INTEGER },
        major: { type: Sequelize.STRING },
        authorizedStaff: { type: Sequelize.BOOLEAN },
        role: { type: Sequelize.ENUM('admin', 'tutor', 'staff', 'student') }
    })
}

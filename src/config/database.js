const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const userModel = require('../models/User')

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

let UserModel = userModel(sequelize, Sequelize)

module.exports = {
  sequelize,
  UserModel
}
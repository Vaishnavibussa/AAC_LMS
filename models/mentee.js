// models/mentee.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mentee = sequelize.define('Mentee', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other mentee-related fields as needed
});

module.exports = Mentee;

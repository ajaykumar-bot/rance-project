const { DataTypes } = require('sequelize');
const { sequelize } = require('../config'); // Adjust the path to your Sequelize connection config

const OTPVerification = sequelize.define(
  'OTPVerification',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: 'id',
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      // references: {
      //   model: User,
      //   key: 'id',
      // },
      // onDelete: 'SET NULL', // Set user_id to NULL if the referenced user is deleted
      field: 'user_id',
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'otp',
    },
    expiryInMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'expiry_in_minutes',
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_used',
    },
    createdAt: {
      type: DataTypes.STRING,
      defaultValue: 'normal', // Default value 'normal'
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.STRING,
      defaultValue: 'normal', // Default value 'normal'
      field: 'updated_at',
    },
  },
  {
    tableName: 'otp_verifications',
  }
);

module.exports = { OTPVerification };

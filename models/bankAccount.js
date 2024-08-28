const { DataTypes } = require('sequelize');
const { sequelize } = require('../config'); // Adjust the path to your Sequelize connection config

const BankAccount = sequelize.define(
  'BankAccount',
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
      // onDelete: 'CASCADE',
      field: 'user_id',
    },
    acHolder: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ac_holder',
    },
    acNo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ac_no',
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'bank',
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'branch',
    },
    ifsc: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ifsc',
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
    tableName: 'bank_accounts',
  }
);

module.exports = { BankAccount };

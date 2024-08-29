const { DataTypes } = require('sequelize');
const { sequelize } = require('../config'); // Adjust the path to your Sequelize connection config

const Address = sequelize.define(
  'Address',
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field: 'id',
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      //   references: {
      //     model: User, // This is the reference to the User model
      //     key: 'id',
      //   },
      //   onDelete: 'CASCADE', // Delete addresses when the associated user is deleted
      field: 'user_id',
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'type',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'address',
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'address2',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'city',
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'district',
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'state',
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'pin',
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'updated_at',
    },
  },
  {
    tableName: 'addresses',
  }
);

module.exports = { Address };

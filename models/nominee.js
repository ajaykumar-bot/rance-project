const { DataTypes } = require("sequelize");
const { sequelize } = require("../config"); // Adjust the path to your Sequelize connection config

const Nominee = sequelize.define(
  "Nominee",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field: "id",
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      //   references: {
      //     model: User, // Reference to the User model
      //     key: 'id',
      //   },
      //   onDelete: 'CASCADE', // Delete nominees when the associated user is deleted
      field: "user_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "relation",
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "dob",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
      field: "address",
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
      field: "city",
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
      field: "district",
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
      field: "state",
    },
    pin: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
      field: "pin",
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
      field: "updated_at",
    },
  },
  {
    tableName: "nomnees",
  }
);

module.exports = { Nominee };

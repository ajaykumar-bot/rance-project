const { DataTypes } = require("sequelize");
const { sequelize } = require("../config"); // Adjust the path to your Sequelize connection config

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field: "id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "type",
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "priority",
    },
    createdAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "updated_at",
    },
  },
  {
    tableName: "roles",
  }
);

module.exports = { Role };

const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const File = sequelize.define(
  "File",
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
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "path",
    },
    fileType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "file_type",
    },
    ownerId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "owner_id",
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
    tableName: "files",
  }
);

module.exports = { File };

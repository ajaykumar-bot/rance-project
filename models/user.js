// models/user.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config"); // Adjust the path to your Sequelize connection config

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.BIGINT, // or DataTypes.INTEGER for smaller ranges
      autoIncrement: true,
      primaryKey: true, // Marks this column as the primary key
      allowNull: false, // Ensures the column is not null
      field: "id",
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "google_id",
    },
    googleToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "google_token",
    },
    googleRefreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "google_refresh_token",
    },
    googleAvatar: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "google_avatar",
    },
    parentId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      //   references: {
      //     model: 'users',
      //     key: 'id',
      //   },
      //   onDelete: 'SET NULL',
      field: "parent_id",
    },
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      //   references: {
      //     model: 'roles',
      //     key: 'id',
      //   },
      //   onDelete: 'CASCADE',
      field: "role_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: "email",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "phone",
    },
    whatsapp: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "whatsapp",
    },
    fatherName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "father_name",
    },
    aadhar: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "aadhar",
    },
    pan: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "pan",
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "avatar",
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      defaultValue: "male",
      field: "gender",
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "dob",
    },
    startingLevel: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "starting_level",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_active",
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_blocked",
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_deleted",
    },
    emailVerifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "email_verified_at",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "updated_at",
    },
  },
  {
    tableName: "users",
  }
);

module.exports = { User };

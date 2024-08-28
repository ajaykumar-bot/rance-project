const { DataTypes } = require("sequelize");
const { sequelize } = require("../config"); // Adjust the path to your Sequelize connection config

const PointTransaction = sequelize.define(
  "PointTransaction",
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
      //   onDelete: 'SET NULL', // Set to null if the user is deleted
      field: "user_id",
    },
    name: {
      type: DataTypes.ENUM("lv", "bv", "commission", "other"),
      allowNull: false,
      field: "name",
    },
    ownerType: {
      type: DataTypes.ENUM("self", "team", "other"),
      allowNull: false,
      field: "owner_type",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "amount",
    },
    transactionType: {
      type: DataTypes.ENUM("credit", "debit", "other"),
      allowNull: false,
      field: "transaction_type",
    },
    initiatorId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      //   references: {
      //     model: User, // Reference to the User model
      //     key: 'id',
      //   },
      //   onDelete: 'SET NULL', // Set to null if the initiator is deleted
      field: "initiator_id",
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "reason",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
      field: "description",
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
    tableName: "point_transactions",
  }
);

module.exports = { PointTransaction };

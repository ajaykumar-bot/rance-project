const { DataTypes } = require("sequelize");
const { sequelize } = require("../config"); // Adjust the path to your Sequelize connection config

const Invoice = sequelize.define(
  "Invoice",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "user_name",
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      // references: {
      //   model: User,
      //   key: 'id',
      // },
      // onDelete: 'SET NULL', // Set userId to NULL if the referenced user is deleted
      field: "user_id",
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "type",
    },
    gstNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "gst_number",
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "total_amount",
    },
    totalTax: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "total_tax",
    },
    totalTaxedAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: "total_taxed_amount",
    },
    billingAddressId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      // references: {
      //   model: Address,
      //   key: 'id',
      // },
      // onDelete: 'SET NULL', // Set billingAddressId to NULL if the referenced address is deleted
      field: "billing_address_id",
    },
    shippingAddressId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      // references: {
      //   model: Address,
      //   key: 'id',
      // },
      // onDelete: 'SET NULL', // Set shippingAddressId to NULL if the referenced address is deleted
      field: "shipping_address_id",
    },
    paymentMode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "cash",
      field: "payment_mode",
    },
    modeOfTransport: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "courier",
      field: "mode_of_transport",
    },
    placeOfSupply: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "place_of_supply",
    },
    createdByUserName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "created_by_user_name",
    },
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: true,
      // references: {
      //   model: User,
      //   key: 'id',
      // },
      // onDelete: 'SET NULL', // Set createdBy to NULL if the referenced user is deleted
      field: "created_by",
    },
    createdAt: {
      type: DataTypes.STRING,
      defaultValue: "normal", // Default value 'normal'
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.STRING,
      defaultValue: "normal", // Default value 'normal'
      field: "updated_at",
    },
  },
  {
    tableName: "invoices",
  }
);

module.exports = { Invoice };

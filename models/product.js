const { DataTypes } = require("sequelize");
const { sequelize } = require("../config"); // Adjust the path to your Sequelize connection config

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field: "id",
    },
    itemCode: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable,
      field: "item_code",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Not nullable
      field: "name",
    },
    quantity: {
      type: DataTypes.STRING,
      defaultValue: "0", // Default value as string '0'
      field: "quantity",
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
      field: "weight",
    },
    mrp: {
      type: DataTypes.FLOAT,
      allowNull: false, // Not nullable
      field: "mrp",
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true, // Nullable
      field: "discount",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true, // Nullable
      field: "price",
    },
    expDate: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Nullable
      field: "exp_date",
    },
    lv: {
      type: DataTypes.INTEGER,
      allowNull: false, // Not nullable
      field: "lv",
    },
    blv: {
      type: DataTypes.INTEGER,
      allowNull: false, // Not nullable
      field: "blv",
    },
    cgst: {
      type: DataTypes.FLOAT,
      allowNull: true, // Nullable
      field: "cgst",
    },
    sgst: {
      type: DataTypes.FLOAT,
      allowNull: true, // Nullable
      field: "sgst",
    },
    igst: {
      type: DataTypes.FLOAT,
      allowNull: true, // Nullable
      field: "igst",
    },
    hsnHac: {
      type: DataTypes.STRING,
      allowNull: true, // Nullable
      field: "hsn_hac",
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "normal", // Default value 'normal'
      field: "status",
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
    tableName: "products",
  }
);

module.exports = { Product };

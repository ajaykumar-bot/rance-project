const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const StockTransaction = sequelize.define(
  "StockTransaction",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      field: "id",
    },
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: "users", // Assumes a Users model
        key: "id",
      },
      onDelete: "SET NULL",
      field: "user_id",
    },
    productId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: "products", // Assumes a Products model
        key: "id",
      },
      onDelete: "SET NULL",
      field: "product_id",
    },
    invoiceId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: "invoices", // Assumes an Invoices model
        key: "id",
      },
      onDelete: "SET NULL",
      field: "invoice_id",
    },
    transactionType: {
      type: DataTypes.ENUM(
        "sale",
        "purchase",
        "return",
        "other_add",
        "other_remove"
      ),
      allowNull: false,
      field: "transaction_type",
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "quantity",
    },
    rate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "rate",
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "price",
    },
    tax: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "tax",
    },
    taxedPrice: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "taxed_price",
    },
    openingStock: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "opening_stock",
    },
    closingStock: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "closing_stock",
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
    tableName: "stock_transactions",
  }
);

module.exports = { StockTransaction };

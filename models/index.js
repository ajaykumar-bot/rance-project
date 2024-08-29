const { User } = require("./user");
const { Nominee } = require("./nominee");
const { Address } = require("./address");
const { PointTransaction } = require("./pointTransaction");
const { Product } = require("./product");
const { Role } = require("./role");
const { BankAccount } = require("./bankAccount");
const { OTPVerification } = require("./otpVerification");
const { Invoice } = require("./invoice");
const { StockTransaction } = require("./stockTransaction");
const { File } = require("./file");

User.belongsTo(Role, {
  foreignKey: "roleId",
  sourceKey: "id",
  as: "role",
});
User.belongsTo(User, {
  foreignKey: "parentId",
  sourceKey: "id",
  as: "parent",
});
User.hasMany(Address, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "addresses",
});
User.hasMany(User, {
  foreignKey: "parentId",
  sourceKey: "id",
  as: "children",
});
User.hasMany(PointTransaction, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "pointTransactions",
});
User.hasOne(BankAccount, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "bankAccount",
});
User.hasMany(OTPVerification, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "otps",
});
User.hasOne(Nominee, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "nominee",
});
User.hasMany(Invoice, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "invoices",
});

Address.belongsTo(User, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "user",
});

Nominee.belongsTo(User, {
  foreignKey: "id",
  sourceKey: "userId",
  as: "user",
});

Product.hasMany(StockTransaction, {
  foreignKey: "productId",
  sourceKey: "id",
  as: "stockTransactions",
});

Product.hasMany(File, {
  foreignKey: "ownerId",
  sourceKey: "id",
  as: "files",
});

module.exports = {
  User,
  Role,
  Address,
  PointTransaction,
  BankAccount,
  Nominee,
  Invoice,
  Product,
  StockTransaction,
  File,
};

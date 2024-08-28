const { Sequelize } = require("sequelize");

// Replace with your own database credentials
const sequelize = new Sequelize("rance", "root", "", {
  host: "localhost",
  dialect: "mysql", // or 'postgres' for PostgreSQL
  logging: false,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = { sequelize };

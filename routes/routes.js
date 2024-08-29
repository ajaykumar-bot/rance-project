const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const authRouter = require("./auth");
const { validateUser } = require("../middlewares/authMiddleware");

router.use(userRouter);

router.use("/auth", validateUser, authRouter);

module.exports = router; // Export the router directly

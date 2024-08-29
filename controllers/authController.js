const { User, Role, Address } = require("../models");
const bcrypt = require("bcryptjs");
const { decryptString } = require("../utils/crypto");
const JWT = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, referalId } = req.body;

    if (!name || !email || !password) {
      return res.status(500).json({
        success: false,
        message: "All fields are mandatory !",
      });
    }

    let referalUser = null;
    if (referalId) {
      const email = decryptString(referalId);
      referalUser = User.findOne({ where: { email: email } });

      if (!referalUser) {
        return res.status(500).json({
          success: false,
          message: "Invalid Referal Id",
        });
      }
    }

    const existsUser = await User.findOne({ where: { email: email } });

    if (existsUser) {
      return res.status(500).json({
        success: false,
        message: "User Already Exists !",
      });
    }

    let salt = bcrypt.genSaltSync(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId: 2,
      isActive: 1,
      parentId: referalUser ? referalUser.id : 1,
    });

    // await user.populate('role').execPopulate();

    return res.status(200).json({
      success: true,
      message: "Register Successfully !",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Register API !",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password!",
      });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "User is not Active",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "User is Blocked",
      });
    }

    if (user.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = JWT.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await user.reload({
      include: [
        { model: Role, as: "role" },
        { model: Address, as: "addresses" },
      ],
    });

    // If all checks pass, log the user in and return success response
    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Login API!",
      error: error.message,
    });
  }
};

module.exports = { register, login };

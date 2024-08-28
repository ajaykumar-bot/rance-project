const JWT = require("jsonwebtoken");
const validateUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing authorization header",
      });
    }

    const [prefix, encodedSting] = token.split(" ");
    if (prefix !== "Bearer" || !encodedSting) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization header",
      });
    }
    JWT.verify(encodedSting, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized User!",
          err,
        });
      } else {
        req.body.email = decode.email;
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Auth API",
      error: error.message,
    });
  }
};

module.exports = { validateUser };

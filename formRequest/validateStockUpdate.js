const { body, validationResult } = require("express-validator");

const validateStockUpdate = [
  body("quantity")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("Quantity is required and must be atleast 1"),
  body("rate")
    .isNumeric()
    .isLength({ min: 1 })
    .withMessage("Rate is required and must be atleast 1"),
  body("tax")
    .isNumeric()
    .isLength({ min: 0, max: 100 })
    .withMessage("Tax is required and must be in between 0 to 100"),

  (req, res, next) => {
    console.log(req.files);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }
    next();
  },
];

module.exports = { validateStockUpdate };

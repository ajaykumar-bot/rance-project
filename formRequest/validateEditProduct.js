const { body, validationResult } = require("express-validator");
const validateEditProduct = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name is required and should be a string"),
  body("hsn_hac").optional().isString().withMessage("Hsn Hac Must be String"),
  body("item_code")
    .optional()
    .isString()
    .withMessage("Item Code Must be String"),
  body("mrp").isNumeric().withMessage("MRP is required and must be a number"),
  body("price")
    .isNumeric()
    .withMessage("Price is required and must be a number"),
  body("exp_date")
    .optional()
    .isDate()
    .withMessage("Expiry date is required and must be a date"),
  body("weight").optional().isNumeric().withMessage("Must be a Number"),
  body("stock_quantity")
    .optional()
    .isNumeric()
    .withMessage("Stock Quantitiy is required and must be a number"),
  body("lv")
    .optional()
    .isNumeric()
    .withMessage("Stock Cgst is required and must be a number"),
  body("blv")
    .optional()
    .isNumeric()
    .withMessage("Stock Cgst is required and must be a number"),
  body("cgst")
    .isNumeric()
    .withMessage("Stock Cgst is required and must be a number"),
  body("sgst")
    .isNumeric()
    .withMessage("Stock Cgst is required and must be a number"),

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

module.exports = { validateEditProduct };

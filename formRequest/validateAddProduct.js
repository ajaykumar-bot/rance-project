const { body, validationResult } = require("express-validator");

const validateAddProduct = [
  body("name")
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
    .isDate()
    .withMessage("Expiry date is required and must be a date"),
  body("weight").optional().isNumeric().withMessage("Must be a Number"),
  body("stock_quantity")
    .isNumeric()
    .withMessage("Stock Quantitiy is required and must be a number"),
  body("stock_purchase_rate")
    .isNumeric()
    .withMessage("Stock Purchase Rate is required and must be a number"),
  body("stock_sgst")
    .optional()
    .isNumeric()
    .withMessage("Stock Sgst Must be a number"),
  body("stock_cgst")
    .optional()
    .isNumeric()
    .withMessage("Stock Cgst Must be a number"),
  body("lv")
    .isNumeric()
    .withMessage("Stock Cgst is required and must be a number"),
  body("blv")
    .isNumeric()
    .withMessage("Stock Cgst is required and must be a number"),
  body("cgst")
    .isNumeric()
    .withMessage("Stock Cgst is required and must be a number"),
  body("sgst")
    .isNumeric()
    .withMessage("Stock Cgst is required and must be a number"),

  body("images").optional().isArray().withMessage("Images must be an array"),
  body("images.*")
    .custom((value, { req }) => {
      if (
        !req.files &&
        req.files.length === 0 &&
        !req.files.mimetype.contains("jpg,jpeg,png,gif,mp4,mov,avi")
      ) {
        return false;
      }
      return true;
    })
    .withMessage(
      "Please upload image type of jpg, jpeg, png, gif, mp4, mov, avi"
    ),

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

module.exports = { validateAddProduct };

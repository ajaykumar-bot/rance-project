const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("name")
    .isString()
    .withMessage("Name is required and should be a string"),
  body("hsn_hac")
    .optional()
    .isString()
    .withMessage("HSN HAC should be a string"),
  body("item_code")
    .optional()
    .isString()
    .withMessage("Item Code should be a string"),
  body("mrp").isNumeric().withMessage("MRP is required and should be numeric"),
  body("price")
    .isNumeric()
    .withMessage("Price is required and should be numeric"),
  body("exp_date")
    .optional()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Exp Date should be in YYYY-MM-DD format"),
  body("weight").optional().isNumeric().withMessage("Weight should be numeric"),

  body("images").optional().isArray().withMessage("Images should be an array"),
  body("images.*")
    .custom((value, { req }) => {
      // Here you would need to implement the file type and size validation
      // For simplicity, this example does not handle file validation
      return true;
    })
    .withMessage(
      "Images should be of type jpg, jpeg, png, gif, mp4, mov, avi and max size 20MB"
    ),

  body("stock_quantity")
    .isNumeric()
    .withMessage("Stock Quantity is required and should be numeric"),
  body("stock_purchase_rate")
    .isNumeric()
    .withMessage("Stock Purchase Rate is required and should be numeric"),
  body("stock_sgst")
    .optional()
    .isNumeric()
    .withMessage("Stock SGST should be numeric"),
  body("stock_cgst")
    .optional()
    .isNumeric()
    .withMessage("Stock CGST should be numeric"),

  body("lv").isNumeric().withMessage("LV is required and should be numeric"),
  body("blv").isNumeric().withMessage("BLV is required and should be numeric"),
  body("cgst")
    .isNumeric()
    .withMessage("CGST is required and should be numeric"),
  body("sgst")
    .isNumeric()
    .withMessage("SGST is required and should be numeric"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateProduct };

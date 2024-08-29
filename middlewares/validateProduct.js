const { check, validationResult } = require("express-validator");

const validateProduct = [
  // check("name", "Name is required").notEmpty().isString(),
  // check("hsn_hac", "Hsn Hac Must be String").isString(),
  // check("item_code", "Item Code Must be String").isString(),
  // check("mrp", "MRP is required").notEmpty().isNumeric(),
  // check("price", "Price is required").notEmpty().isNumeric(),
  // check("exp_date", "MRP is required").notEmpty().isNumeric(),
  // check("weight", "Must be a Number").isNumeric(),
  // check("stock_quantity", "Stock Quantitiy is required").notEmpty().isNumeric(),
  // check("stock_purchase_rate", "Stock Purchase Rate is required")
  //   .notEmpty()
  //   .isNumeric(),
  // check("stock_sgst", "Stock Sgst Must be a number").isNumeric(),
  // check("stock_cgst", "Stock Cgst Must be a number").isNumeric(),
  // check("lv", "Stock Cgst Must be a number").notEmpty().isNumeric(),
  // check("blv", "Stock Cgst Must be a number").notEmpty().isNumeric(),
  // check("cgst", "Stock Cgst Must be a number").notEmpty().isNumeric(),
  // check("sgst", "Stock Cgst Must be a number").notEmpty().isNumeric(),

  check("images", "Images Must be an Array").isEmpty().isArray(),
  check("images.*")
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
    console.log(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateProduct };

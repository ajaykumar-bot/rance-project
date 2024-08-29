const { body, validationResult } = require("express-validator");

const validateSearchProduct = [
  body("discount")
    .optional()
    .isNumeric()
    .isLength({ min: 0, max: 100 })
    .withMessage("Discount must be in between 0 to 100"),
  body("pricemin")
    .optional()
    .isNumeric()
    .isLength({ min: 0 })
    .withMessage("Price min must be atleast 0"),
  body("pricemax")
    .optional()
    .isNumeric()
    .withMessage("Price max must be atleast 0"),
  body("minbv").optional().isNumeric().withMessage("minbv must be atleast 0"),
  body("minlv").optional().isNumeric().withMessage("minlv must be atleast 0"),

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

module.exports = { validateSearchProduct };

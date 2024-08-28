const { Product } = require("../models");

const store = async (req, res) => {
  try {
    const {
      name,
      stockQuantity,
      mrp,
      price,
      itemCode,
      expDate,
      weight,
      lv,
      blv,
      cgst,
      sgst,
      hsnHac,
    } = req.body;
    const product = await Product.create({
      name,
      stockQuantity,
      mrp,
      price,
      itemCode,
      expDate,
      weight,
      lv,
      blv,
      cgst,
      sgst,
      hsnHac,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Product Store API",
      error: error.message,
    });
  }
};

module.exports = { store };

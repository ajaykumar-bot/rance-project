const { validationResult } = require("express-validator");
const { Product, Invoice, StockTransaction, User } = require("../models");
const { Op } = require("sequelize");

const store = async (req, res) => {
  try {
    const {
      name,
      stock_quantity,
      mrp,
      price,
      item_code,
      exp_date,
      weight,
      lv,
      blv,
      cgst,
      sgst,
      hsn_hac,
      stock_purchase_rate,
      stock_cgst,
      stock_sgst,
      email,
    } = req.body;
    const product = await Product.create({
      name,
      quantity: stock_quantity,
      mrp,
      price,
      itemCode: item_code,
      expDate: exp_date,
      weight,
      lv,
      blv,
      cgst,
      sgst,
      hsnHac: hsn_hac,
      discount: ((mrp - price) / mrp) * 100,
      igst: sgst + cgst,
    });

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const filePath = path.join(
          "/assets/files/products/images",
          file.filename
        );

        await File.create({
          name: "product image",
          path: filePath,
          file_type: file.mimetype,
          ownerId: product.id,
        });
      }
    }

    stockTotalPrice = stock_quantity * stock_purchase_rate;
    stockTotalTax = stock_sgst + stock_cgst;

    const user = await User.findOne({ where: { email: email } });

    const invoice = await Invoice.create({
      userName: user.name,
      userId: user.id,
      type: "purchase",
      totalAmount: stockTotalPrice,
      totalTax: stockTotalTax,
      totalTaxedAmount:
        stockTotalPrice + (stockTotalTax / 100) * stockTotalPrice,
      paymentMode: "cash",
      placeOfSupply: "company address",
      createdByUserName: user.name,
      createdBy: user.id,
    });

    const stockTransaction = await StockTransaction.create({
      userId: user.id,
      invoiceId: invoice.id,
      transactionType: "purchase",
      quantity: stock_quantity,
      rate: stock_purchase_rate,
      price: stockTotalPrice,
      tax: stock_sgst + stock_cgst,
      taxedPrice: stockTotalPrice + (stockTotalTax / 100) * stockTotalPrice,
      openingStock: 0,
      closingStock: stock_quantity,
      productId: product.id,
    });

    await Product.reload({
      include: [
        { model: File, as: "files" },
        { model: StockTransaction, as: "stockTransactions" },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Product Add Successfully",
      error: error.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Product Store API",
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const {
      name,
      quantity,
      item_code,
      exp_date,
      weight,
      lv,
      blv,
      hsn_hac,
      cgst,
      sgst,
      mrp,
      price,
    } = req.body;
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product) {
      await product.update({
        name: name ?? product.name,
        quantity: quantity ?? product.quantity,
        itemCode: item_code ?? product.itemCode,
        expDate: exp_date ?? product.expDate,
        weight: weight ?? product.weight,
        lv: lv ?? product.lv,
        blv: blv ?? product.blv,
        hsnHac: hsn_hac ?? product.hsnHac,
        cgst: cgst ?? product.cgst,
        sgst: sgst ?? product.sgst,
        igst: sgst + cgst,
        mrp: mrp,
        price: price,
        discount: ((mrp - price) / mrp) * 100,
      });

      return res.status(200).json({
        success: false,
        message: "Product Updated Successfully",
        data: product,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Product Not Found",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Product Update API",
      error: error.message,
    });
  }
};

const product = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const product = await Product.findByPk(id);

      await product.reload({
        include: [
          { model: File, as: "files" },
          { model: StockTransaction, as: "stockTransactions" },
        ],
      });
      return res.status(500).json({
        success: false,
        message: "Error in Product Update API",
        error: error.message,
      });
    }

    return res.status(404).json({
      success: false,
      message: "Invalid Product Id",
      error: error.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Get Product API",
      error: error.message,
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { minbv, minlv, pricemax, pricemin, discount } = req.body;
    const query = {};

    if (minbv) {
      query.blv = { [Op.gte]: minbv };
    }
    if (minlv) {
      query.lv = { [Op.gte]: minlv };
    }
    if (pricemax) {
      query.mrp = { [Op.lte]: pricemax };
    }
    if (pricemin) {
      query.mrp = { [Op.gte]: pricemin };
    }
    if (discount) {
      query.discount = { [Op.gte]: discount - 1 };
    }
    const product = await Product.query();
    if (!isEmpty(query)) {
      product = await product.findAll({
        where: query,
        order: [["createdAt", "DESC"]],
      });
    } else {
      product = product.findAll({ order: [["createdAt", "DESC"]] });
    }

    await product.reload({
      include: [
        { model: File, as: "files" },
        { model: StockTransaction, as: "stockTransactions" },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Search Product API",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    await product.destroy();
    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Delete Product API",
      error: error.message,
    });
  }
};

const stockUpdate = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No Product Found",
      });
    }

    const { quantity, rate, tax, email } = req.body;

    const user = await User.findOne({ where: { email: email } });

    const stockTotalPrice = quantity * rate;

    const invoice = await Invoice.create({
      userName: user.name,
      userId: user.id,
      type: "purchase",
      totalAmount: stockTotalPrice,
      totalTax: tax,
      totalTaxedAmount: stockTotalPrice + (tax / 100) * stockTotalPrice,
      payment_mode: "cash",
      place_of_supply: "company address",
      created_by_user_name: user.name,
      created_by: user.id,
    });

    const stockTransaction = await StockTransaction.create({
      userId: user.id,
      invoiceId: invoice.id,
      transactionType: "purchase",
      quantity: quantity,
      rate: rate,
      price: stockTotalPrice,
      tax: tax,
      taxedPrice: stockTotalPrice + (tax / 100) * stockTotalPrice,
      openingStock: quantity,
      closingStock: quantity + quantity,
      productId: product.id,
    });

    await product.update({
      quantity: stockTransaction.closingStock,
    });

    await product.reload({
      include: [
        { model: File, as: "files" },
        { model: StockTransaction, as: "stockTransactions" },
      ],
    });
    return res.status(200).json({
      success: true,
      message: "Stock Updated Successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Stock Update API",
      error: error.message,
    });
  }
};

module.exports = {
  store,
  update,
  product,
  searchProduct,
  deleteProduct,
  stockUpdate,
};

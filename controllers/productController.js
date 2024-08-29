const { Product, Invoice, StockTransaction, User } = require("../models");

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

const update = async (req, res) => {};

module.exports = { store, update };

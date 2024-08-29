const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const { validateAddProduct } = require("../formRequest/validateAddProduct");
const { upload } = require("../middlewares/multer");
const { validateEditProduct } = require("../formRequest/validateEditProduct");
const {
  validateSearchProduct,
} = require("../formRequest/validateSearchProduct");
const { validateStockUpdate } = require("../formRequest/validateStockUpdate");
const authController = require("../controllers/authController");

router.post("/logout", authController.logout);
router.post("/validate-token", authController.validateToken);

router.get("/profile/:id", userController.profile);

router.post("/user", userController.store);
router.post("/change-user-status/:status/:id", userController.changeStatus);
router.get("/user-invoices/:id", userController.invoiceHistory);
router.get("/user-points/:id", userController.pointHistory);
router.get("/my-team", userController.myTeam);
router.post("/update-personal-details", userController.updatePersonalDetails);
router.post("/update-address", userController.updateAddress);
router.post("/update-nominee", userController.updaetNominee);
router.post("/update-bankac", userController.updateBankAc);
router.post("/update-password", userController.updatePassword);

router.post("/product", validateAddProduct, productController.store);
router.post(
  "/update-product/:id",
  validateEditProduct,
  productController.update
);
router.get("/products/:id", productController.product);
router.post(
  "/filtered-products",
  validateSearchProduct,
  productController.searchProduct
);
router.delete("/delete-product/:id", productController.deleteProduct);
router.post(
  "/stock-update/:productId",
  validateStockUpdate,
  productController.stockUpdate
);

module.exports = router;

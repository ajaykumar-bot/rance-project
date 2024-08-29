const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const { validateProduct } = require("../middlewares/validateProduct");

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
router.post("/update-password", validateProduct, userController.updatePassword);

router.post("/product", productController.store);

module.exports = router;

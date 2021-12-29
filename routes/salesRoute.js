const express = require("express");
const router = express.Router();
const {
  adminAuthMiddleware,
  authMiddleware,
} = require("../middleware/authentication");
const {
  salesValidation,
  idSalesValidation,
} = require("../validation/salesValidator");
const { validate } = require("../validation/validator");
const {
  createSales,
  updateSales,
  deleteSales,
  getAllSales,
} = require("../modules/sales/salesController");

//create sales
router.post("/create", authMiddleware, validate(salesValidation), createSales);

//update sales
router.put(
  "/update/:salesId",
  authMiddleware,
  validate(idSalesValidation),
  updateSales
);

//delete sales
router.delete(
  "/delete/:salesId",
  authMiddleware,
  validate(idSalesValidation),
  deleteSales
);

//get all sales
router.get("/view", authMiddleware, getAllSales);

module.exports = router;

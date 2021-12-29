const express = require("express");
const router = express.Router();
const { adminAuthMiddleware } = require("../middleware/authentication");
const {
  createUnit,
  getAllUnits,
  updateUnit,
  deleteUnit,
} = require("../modules/unit/unitController");
const { validate } = require("../validation/validator");
const { createUnitDetailsValidation } = require("../validation/unitValidator");

//create unit
router.post(
  "/create",
  adminAuthMiddleware,
  // validate(createUnitDetailsValidation),
  createUnit
);
//update unit
router.put("/update/:unitId", adminAuthMiddleware, updateUnit);
//delete unit
router.delete("/delete/:unitId", adminAuthMiddleware, deleteUnit);
//get all units
router.get("/view", adminAuthMiddleware, getAllUnits);

module.exports = router;

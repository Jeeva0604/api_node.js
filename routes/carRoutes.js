const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/getCars", carController.getAllCars);
router.get("/:id", carController.getCar);
router.post("/addCar", carController.addCar);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;

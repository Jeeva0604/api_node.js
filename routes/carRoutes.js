const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/get_cars", carController.getAllCars);
router.get("/:id", carController.getCar);
router.post("/add_car", carController.addCar);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;

const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

router.get("/getAll", employeesController.getAllEmployees);
router.get("/:id", employeesController.getEmployeeById);
router.post("/addEmployee", employeesController.createEmployee);
router.put("/:id", employeesController.updateEmployee);
router.delete("/:id", employeesController.deleteEmployee);

module.exports = router;

const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

router.get("/get_employees", employeesController.getAllEmployees);
router.get("/:id", employeesController.getEmployeeById);
router.post("/add_employee", employeesController.createEmployee);
router.put("/:id", employeesController.updateEmployee);
router.delete("/:id", employeesController.deleteEmployee);

module.exports = router;

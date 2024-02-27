const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig.development);
exports.getAllEmployees = async (req, res) => {
  try {
    const data = await knex.select("*").from("employees");
    if (data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send("No data found");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data");
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await knex("employees").where({ id });
    if (data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send("No data found for the provided ID");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data");
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, gender, age, address, phone_number } = req.body;
    await knex("employees").insert({
      name,
      gender,
      age,
      address,
      phone_number,
    });
    res.send("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error inserting data");
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, gender, age, address, phone_number } = req.body;
    const existingEmployee = await knex("employees").where({ id }).first();
    if (!existingEmployee) {
      return res.status(404).send("Employee not found");
    }
    await knex("employees")
      .where({ id })
      .update({ name, gender, age, address, phone_number });
    res.send("Employee updated successfully");
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send("Error updating employee");
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const existingEmployee = await knex("employees").where({ id }).first();
    if (!existingEmployee) {
      return res.status(404).send("Employee not found");
    }
    await knex("employees").where({ id }).del();
    res.send("Employee deleted successfully");
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Error deleting employee");
  }
};


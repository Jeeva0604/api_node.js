const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

app.use(express.json());
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);
const PORT = process.env.PORT || 3000;

///Get All Data

app.get("/data", async (req, res) => {
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
});

///Get Data with id

app.get("/data/:id", async (req, res) => {
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
});

///Post Data
app.post("/data", async (req, res) => {
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
});

///Update data

app.put("/data/:id", async (req, res) => {
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
});

///Delete Data with id

app.delete("/data/:id", async (req, res) => {
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
});

///Delete Data

app.delete("/data/deleteAll", async (req, res) => {
  try {
    await knex("employees").del();
    res.send("All data deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Error deleting data");
  }
});
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

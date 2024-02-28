const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig.development);

exports.getAllCars = async (req, res) => {
  try {
    const data = await knex.select("*").from("cars");
    if (data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send("No data found");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data", error);
  }
};

exports.getCar = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await knex("cars").where({ id });
    if (data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send("No data found for the provided ID");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data this " + id, error);
  }
};

exports.addCar = async (req, res) => {
  try {
    const { car_name, model, year, color, mileage } = req.body;
    await knex("cars").insert({
      car_name,
      model,
      year,
      color,
      mileage,
    });
    res.send("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error inserting data", error);
  }
};

exports.updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    const { car_name, model, year, color, mileage } = req.body;
    const existingCar = await knex("cars").where({ id }).first();
    if (!existingCar) {
      res.status(404).send("No data found");
    } else {
      const data = await knex("cars").where({ id }).update({
        car_name,
        model,
        year,
        color,
        mileage,
      });
      res.send("Data updated successfully");
    }
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Error update this data", error);
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await knex("cars").where({ id }).del();
    res.send("Data deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Error deleting data:", error);
  }
};

// controllers/imageController.js
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig.development);
const path = require("path");

exports.uploadImage = async (req, res) => {
  try {
    const { filename, path: imagePath } = req.file;

    // Insert file details into the database
    await knex("images").insert({
      filename,
      path: imagePath,
    });

    res.send("Image uploaded successfully.");
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Error uploading image");
  }
};



exports.uploadImages = async (req, res) => {
  try {
    const files = req.files; // Get array of uploaded files

    // Insert file details into the database for each uploaded file
    const insertPromises = files.map(async (file) => {
      await knex("images").insert({
        filename: file.filename,
        path: file.path,
      });
    });

    // Wait for all insert operations to complete
    await Promise.all(insertPromises);

    res.send("Images uploaded successfully.");
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).send("Error uploading images");
  }
};

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

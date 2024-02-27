const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const employeesRoutes = require("./routes/employeesRoutes");
const carRoutes = require("./routes/carRoutes");

app.use("/employeesData", employeesRoutes);

app.use("/carDetails", carRoutes);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", authRoutes);

mongoose
    .connect("mongodb://localhost:27017/shop")
    .then((result) => {
        app.listen(8080),
            () => {
                console.log("server running");
            };
    })
    .catch((err) => console.log(err));
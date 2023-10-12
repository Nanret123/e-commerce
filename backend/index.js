const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const multer = require("multer"); 

const authRoutes = require("./routes/authRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
if(
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ){
  cb(null, true)
}else{
  cb(null, false)
}
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer({storage: multerStorage, fileFilter: fileFilter}).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/auth", authRoutes);
app.use(productsRoutes);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then((result) => {
    app.listen(8080),
      () => {
        console.log("server running");
      };
  })
  .catch((err) => console.log(err));

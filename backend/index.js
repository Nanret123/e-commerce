
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose =  require("mongoose");
const app = express();
const cors = require("cors");
const multer = require("multer");

const feedRoutes = require("./routes/feed.js");
const authRoutes = require("./routes/auth.js");

app.use(cors());
app.use(express.json());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
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
}
//app.use(bodyParser.urlencoded({extended: false}));
app.use("/images",express.static(path.join(__dirname, "images")));
app.use(
    multer({storage: fileStorage, fileFilter: fileFilter}).single("image")
);

app.use('/auth', authRoutes);
app.use( itemRoutes);

app.use((error,req,res,next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message})
});

mongoose.connect("mongodb://localhost:27017/ecommerce")
.then(res => {
	app.listen(3000)
})
.catch(err => console.log(err));

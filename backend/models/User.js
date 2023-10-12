const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: [true, "isRequired"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "isRequired"],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cart: {
        items:[
            {
                productId: {
                  type: Schema.Types.ObjectId,

                  ref:"Product",
                  required: true
                },
                quantity: {
                  type: Number,
                  required: true,
                  
                }
            }
        ]
       
    },
    
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
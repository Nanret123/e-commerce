const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
        type: Object,
        default: {
            total: 0,
            count: 0,
        },
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
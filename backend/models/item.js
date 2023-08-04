const mongoose = require("mongoose");
const Schema = mongoose.Schema;

cont itemSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	price:{
		type: Number,
		required: true
	},
	date_added: {
		type: Date,
	    default: Date.now
	},
	creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
	
});

module.exports = mongoose.model("Item", itemSchema);

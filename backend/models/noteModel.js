const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		title: {
			type: String,
		},
		body: {
			type: String,

		},
		category: {
			type: String,

		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true, minlenght: 3 },
	email: { type: String, required: true, minlenght: 6 },
	createdAt: { type: Date, default: Date.now },
	chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "chat" }],
	socketId: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

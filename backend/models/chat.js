const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
	user1: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	user2: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

	message: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
	message: [{ type: mongoose.Schema.Types.ObjectId, ref: "message" }],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

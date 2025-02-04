const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user1: { type: Schema.Types.ObjectId, ref: "user" },
     user2: { type: Schema.Types.ObjectId, ref: "user" }
 
  
  message: [{ type: Schema.Types.ObjectId, ref: "message" }],

});

const Chat= mongoose.model("Chat", chatSchema);

module.exports = Chat;
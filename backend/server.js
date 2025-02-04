const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("./database");
const Message = require("./models/message");
const Chat = require("./models/chat");
const User = require("./models/user");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connection.on("connected", () => {
	console.log("Connexion à MongoDB réussie !");
});

mongoose.connection.on("error", (err) => {
	console.log("Erreur de connexion à MongoDB :", err);
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
	console.log("Un utilisateur est connecté.");

	Message.find({}, (err, messages) => {
		if (err) throw err;
		socket.emit("previousMessages", messages);
	});

	socket.on("chatMessage", (data) => {
		const message = new Message({
			username: data.username,
			content: data.content,
		});

		message.save((err, savedMessage) => {
			if (err) throw err;

			if (user) {
				let chat = new Chat({
					user1: "user_id1",
					user2: "user_id2",
					message: [savedMessage._id],
				});

				chat.save((err, newChat) => {
					if (err) throw err;
					io.emit("newMessage", savedMessage);
				});
			}
		});
	});

	socket.on("disconnect", () => {
		console.log("Un utilisateur s'est déconnecté.");
	});
});
server.listen(3002, () => {
	console.log("Le serveur est lancé sur http://localhost:3002");
});

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const cors = require("cors");

const connectDB = require("./database");

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const app = express();
const port = 3260;
const server = http.createServer(app);

connectDB();

app.use(express.json());
app.use(cors());

let activeUsers = [];

const io = socketIo(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
		allowedHeaders: ["my-custom-header"],
		credentials: true,
	},
});

app.use("", messageRoutes);
app.use("", chatRoutes);
app.use("", userRoutes);

io.on("connection", async (socket) => {
	try {
		console.info(`connection pour ${socket.id}`);
		activeUsers.push(socket.id);
		console.info(`utilisateurs actif: ${activeUsers}`);
		socket.on("chat message", (data) => {
			console.log(`message from ${socket.id} : ${data.content}`);
			//ici logique pour engregistrer une message sur base de donnees
			if (data.targetSocketId) {
				io.to(data.targetSocketId).emit("chat message", {
					userId: socket.id,
					message: data.message,
				});
				console.info(`message sent`);
			} else {
				console.info("user is offline");
			}
			//logique pour plusieurs
		});

		socket.on("disconnect", () => {
			const disconnectedId = activeUsers.findIndex(socket.id);
			activeUsers.splice(disconnectedId, 1);
			console.log(`A user ${socket.id} disconnected`);
		});
	} catch (err) {
		console.error("err");
	}
});

server.listen(port, () => {
	console.info("serveur demaree", `http://localhost:${port}`);
});

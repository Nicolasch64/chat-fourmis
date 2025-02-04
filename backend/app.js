const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.use("/messages", messageRoutes);
app.use("/chat", chatRoutes);
app.use("/users", userRoutes);

io.on("connection", async (socket) => {
  try {
    console.info(`connection pour ${socket.id}`);

    socket.on("chat message", (data) => {
      console.log(`message from ${socket.id} to ${data.targetSocketId}`);
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
      console.log(`A user ${socket.id} disconnected`);
    });
  } catch (err) {
    console.error("err");
  }
});

server.listen(port, () => {
  console.info("serveur demaree", "http://localhost:3000");
});

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("./database");
const Message = require("./models/message");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté.');

  



const app = express();
const server = http.createServer(app);
const io = socketIo(server);
    server.listen(3002, () => {
			console.log("Le serveur est lancé sur http://localhost:3000");
		});
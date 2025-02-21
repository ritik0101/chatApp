const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const path = require('path');
const { Server } = require("socket.io");

app.use(cors());

const port = process.env.PORT || 5000;


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Ensure this matches your frontend URL
    methods: ["GET", "POST"],
  },
});


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Handle joining a room
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  // Handle sending a message
  socket.on("send_message", (data) => {
    console.log("Message received on server:", data);

    // Emit the message to everyone in the room except the sender
    socket.to(data.room).emit("receive_message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// Start the server
server.listen(3001, () => {
  console.log("SERVER RUNNING on port 3001");
});

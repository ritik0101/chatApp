const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 3001;

// ✅ Allow CORS dynamically for Render
app.use(cors({
  origin: "*",  // Allow all origins (change this to your deployed frontend URL)
  methods: ["GET", "POST"]
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// ✅ Serve static files correctly
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ✅ WebSocket handling
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// ✅ Use Render-assigned PORT
server.listen(port, () => {
  console.log(`SERVER RUNNING on port ${port}`);
});

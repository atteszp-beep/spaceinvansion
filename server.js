const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("🚀 SCIFI RENDER SERVER LIVE");
});

/* SOCKET */
io.on("connection", (socket) => {
    console.log("player:", socket.id);
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, "0.0.0.0", () => {
    console.log("RUNNING ON", PORT);
});

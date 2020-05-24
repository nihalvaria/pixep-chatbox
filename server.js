const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")));

const WebSocket = require("ws");

const webSocketServer = new WebSocket.Server({ port: 8080 });
webSocketServer.on("connection", (webSocket) => {
    webSocket.on("message", (message) => {
        console.log("Received:", message);
        broadcast(message);
    });
});

function broadcast(data) {
    webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

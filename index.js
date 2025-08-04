const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

let activeClients = [];

io.on('connection', socket => {
    console.log("✅ User connected");

    socket.on('attend_call', (data) => {
        console.log("📞 Call attended:", data.callsid);
        io.emit('call_attended', data); // notify others
    });

    socket.on('disconnect', () => {
        console.log("❌ User disconnected");
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log("🚀 WebSocket server running");
});

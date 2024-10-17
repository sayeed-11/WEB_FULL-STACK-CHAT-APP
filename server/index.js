const { log } = require('console');
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io')

const PORT = 8000;
const app = express();

const server = http.createServer(app);
app.use(cors());

server.listen(PORT, () => {
    log(`Server is running at PORT : ${PORT}`);
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', (client) => {
    log('socket is on connction!!!!');
    log('client id : ', client.id);

    client.on("join_room", room => {
        client.join(room);
        console.log(`User with id : ${client.id} and join the room : ${room}`);

    })

    client.on("send_message", data => {
        client.to(data.room).emit("receive_message", data)
        // console.log(data, '-----------');
        
    })


    client.on('disconnect', () => {
        console.log('user disconnected : ' + client.id);

    })
})
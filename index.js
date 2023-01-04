const { Console } = require('console');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/templates/index.html');
});

io.on('connection', (socket) => {
    console.log("Usuario conectado para chatear");

    socket.on('chat message',(msg) =>{
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log("El usuario se a desconectado")
    });
});

server.listen(8080, () => {
    console.log("Entrando en el puerto 8080");
});
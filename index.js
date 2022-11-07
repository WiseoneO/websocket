const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(3000, ()=>{
    console.log('app listeniong to request on port 3000');
})

// static files
app.use(express.static('public'));

// socket setup

const io = socket(server);

io.on('connection', socket=>{
    console.log('made socket connection');
    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data)
    });
    // typing message
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    })
})
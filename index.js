var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ent = require('ent');
var fs = require('fs');
var moment = require('moment');
app.get('/',  (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
io.sockets.on('connection',  (socket, username) => {
    socket.on('new_member', (username) => {
        username = ent.encode(username);
        socket.username = username;
        socket.broadcast.emit('new_member', username);
    });
    socket.on('message',  (message) => {
        message = ent.encode(message);
        socket.broadcast.emit('message', {username: socket.username, message: message});
    }); 
});
server.listen(8080);
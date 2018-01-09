var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

//io.on helps you listen for events
io.on('connection', function (socket) {
    console.log('User connected via socket.io');
    
    socket.on('joinRoom', function (req) {
        clientInfo[socket.id] = req;
        socket.join(req.room);
        socket.broadcast.to(req.room).emit('message', {
           name: 'New User',
           text: req.name + ' has joined',
           chatTime: moment().valueOf()
        });
    });
    
    socket.on('message', function (message) {
        console.log('message recieved: ' + message.text);
        message.chatTime = moment().valueOf();
        io.to(clientInfo[socket.id].room).emit('message', message); 
    });
    
    socket.emit('message', {
        name: 'Default User',
        text: 'Welcome to the chat application',
        chatTime: moment().valueOf()
    });
});

http.listen(PORT, function () {
    console.log('Server started!');
});


 //socket.broadcast.emit() => sends msg to err1 excluding the sender
 //io.emit() =>sends msg to err1 including the sender

//socket uses string with the first arg the name of the event stringed and second arg callback to exec 
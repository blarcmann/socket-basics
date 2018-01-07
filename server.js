var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
//io.on helps you listen for events
io.on('connection', function (socket) {
    console.log('User connected via socket.io');
    
    socket.on('message', function (message) {
        console.log('message recieved: ' + message.text);
        //socket.broadcast.emit() => sends msg to err1 excluding the sender
        //io.emit() =>sends msg to err1 including the sender
        socket.broadcast.emit('message', message);
    });
    
    socket.emit('message', {
        text: 'Welcome to the chat application'
    });
});

http.listen(PORT, function () {
    console.log('Server started!');
});




//socket uses string with the first arg the name of the event stringed and second arg callback to exec 
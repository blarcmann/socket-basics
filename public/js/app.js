var socket = io();


var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room_title') || ' Curious? ';
console.log(name + ' wants to join us ');

jQuery('.room_title').text(room);
socket.on('connect', function () {
    console.log('Connected to socket.io server!');
    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function (message) {
    var momentChatTime = moment.utc(message.chatTime);
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>')
    console.log('New message!');
    console.log(message.text);
    
    $message.append('<p><strong>' + message.name + ' - ' + momentChatTime.local().format('h:mm a') + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');
    $messages.append($message);
});

//Handles submitting of new message
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    event.preventDefault();
    
    var $message =  $form.find('input[name=message]');
    
    socket.emit('message', {
        name: name,
        text: $message.val()
    });
    
    $message.val('');
});








//socket uses string with the first arg the name of the event stringed and second arg callback to exec 
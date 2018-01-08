var socket = io();

socket.on('connect', function () {
    console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
    var momentChatTime = moment.utc(message.chatTime);
    console.log('New message!');
    console.log(message.text);
    
    jQuery('.messages').append('<p>' + '<strong>' + momentChatTime.local().format('h:mm a') + '</strong>' + ' : '  + message.text + '</p>');
});

//Handles submitting of new message
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    event.preventDefault();
    
    var $message =  $form.find('input[name=message]');
    
    socket.emit('message', {
        text: $message.val()
    });
    
    $message.val('');
});








//socket uses string with the first arg the name of the event stringed and second arg callback to exec 
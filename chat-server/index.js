var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
    res.send('<h1>What it do</h1>');
});

http.listen(3500, function(){
    console.log('Listening on *:3500');
});

io.on('connection', function(socket){
    socket.on('disconnect',()=>console.log('Socket disconnected'));
    socket.emit('message','How can I help you today?');
});


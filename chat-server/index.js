var getUser = require('./utils/userAvatarAPI');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
    res.send('<h1>What it do</h1>');
});

http.listen(3500, function(){
    console.log('Listening on *:3500');
});

const handleMessage = (data, socket) =>{
    console.log('Got message', data);
    const {type} = data;
    switch(type){
        case "initialize":
            console.log('Initializing to client!');
            socket.emit('message',{type:'chat', message:`Hello ${data.name}, I understand you need help with ${data.topic}`, sender:'agent'});
            break;
        default:
            break;
    }
}

io.on('connection', async function(socket){
    console.log('socket connected!');
    socket.on('disconnect',()=>console.log('Socket disconnected'));
    const {photo, name} = await getUser.getUser();
    // console.log('Got user as', name);
    socket.emit('message', {type:"initialize", photo, name});
    socket.on('message', (data)=>console.log('Got a message!',data));
    // `$user$photo:${photo}$name:${name}`
});

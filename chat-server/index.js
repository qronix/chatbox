var getUser = require('./utils/userAvatarAPI');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(3500, function(){
    console.log('Listening on *:3500');
});

//when a message is received from the client
//determine the type and take the appropriate action
const handleMessage = (data, socket) =>{
    const {type} = data;
    switch(type){
        case "initialize":
            socket.emit('message',{type:'chat', message:`Hello ${data.name}, I understand you need help with ${data.topic}`, sender:'agent'});
            break;
        case "chat":
            break;
        default:
            break;
    }
}

io.on('connection', async function(socket){
    socket.on('disconnect',()=>console.log('Socket disconnected'));
    socket.on('message', (data)=>handleMessage(data,socket));
    try{
        //get a random user avatar from the uifaces api
        const {photo, name} = await getUser.getUser();
        socket.emit('message', {type:"initialize", photo, name, sender:'agent'});
    } catch(err){
        console.error('Could not get avatar');
        socket.emit('message', {type:"initialize", photo:null, name:"agent", sender:'agent'});
    }
});

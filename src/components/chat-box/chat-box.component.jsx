import React, {useEffect, useState} from 'react';
import socketIOClient from 'socket.io-client';
import uuid from 'uuid';

import ChatMessage from '../chat-message/chat-message.component';


import './chat-box.styles.scss';

const ChatBox = ({handleMessage, userData, messages, agentInfo}) => {

    const [socketInfo, setSocketInfo] = useState({
        endpoint:'http://127.0.0.1:3500'
    });
    const socket = socketIOClient(socketInfo.endpoint);
    socket.on('message', (data)=>handleMessage(data));
    socket.on('connect',()=>{
        socket.emit('message', {type:'initialize', name:'Test', topic:'Testing'});
    });
    const stuff = (socket)=>{
        socket.emit('message',{type:'initialize', name:'Test', topic:'Testing'});
    }
    useEffect(()=>{
        // socket.emit('message', {type:'initialize', name:'Test', topic:'Testing'});
        return ()=>{
            console.log('Disconnecting!');
            socket.close();
        }
    },[]);

    const buildMessages = () => {
        let chatMessages = [];
        for(let message in messages){
            let chatMessage = null;
            if(message.sender==='agent'){
                chatMessage = <ChatMessage messageData = {messages[message]} avatar={agentInfo.photo} key={uuid()}/>;
            } else {
                chatMessage = <ChatMessage messageData = {messages[message]} avatar={null} key={uuid()}/>;
            }
            chatMessages.push(chatMessage);
        }
        return chatMessages;
    }
    return(
        <div className="chat-box">
            {buildMessages()}
        </div>
    );
}

export default ChatBox;
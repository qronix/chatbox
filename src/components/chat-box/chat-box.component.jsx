import React, {useEffect, useState} from 'react';
import socketIOClient from 'socket.io-client';

import ChatMessage from '../chat-message/chat-message.component';


import './chat-box.styles.scss';

const ChatBox = ()=> {

    const [socketInfo, setSocketInfo] = useState({
        endpoint:'http://127.0.0.1:3500'
    });
    
    useEffect(()=>{
        const socket = socketIOClient(socketInfo.endpoint);
        socket.on('connect',()=>console.log('connected'));
        socket.on('message', (data)=>console.log("Got the data: ", data));
        return ()=>{
            console.log('Disconnecting!');
            socket.close();
        }
    });

    return(
        <div className="chat-box">
            <ChatMessage/>
        </div>
    );
}

export default ChatBox;
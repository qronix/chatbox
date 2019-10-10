import React, {useEffect, useState} from 'react';
import socketIOClient from 'socket.io-client';

import ChatMessage from '../chat-message/chat-message.component';


import './chat-box.styles.scss';

const ChatBox = ({handleMessage}) => {

    const [socketInfo, setSocketInfo] = useState({
        endpoint:'http://127.0.0.1:3500'
    });

    const [agentInfo, setAgentInfo] = useState({
        name:null,
        photo:null
    });

    useEffect(()=>{
        const socket = socketIOClient(socketInfo.endpoint);
        socket.on('connect',()=>console.log('connected'));
        socket.on('message', (data)=>handleMessage(data));
        return ()=>{
            console.log('Disconnecting!');
            socket.close();
        }
    },[]);

    // const handleMessage = data=>{
    //     const {type} = data;
    //     switch(type){
    //         case "initialize":
    //             setAgentInfo({name:data.name, photo:data.photo});
    //             break;
    //         default:
    //             return null;
    //     }
    // }

    return(
        <div className="chat-box">
        </div>
    );
}

export default ChatBox;
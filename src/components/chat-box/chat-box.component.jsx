import React from 'react';
import uuid from 'uuid';

import ChatMessage from '../chat-message/chat-message.component';


import './chat-box.styles.scss';

const ChatBox = ({messages, agentInfo}) => {
    const buildMessages = () => {
        let chatMessages = [];
        for(let message in messages){
            let chatMessage = null;
            if(messages[message].sender==='agent'){
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
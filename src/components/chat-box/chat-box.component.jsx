import React, {useRef, useEffect, useState} from 'react';
import uuid from 'uuid';

import ChatMessage from '../chat-message/chat-message.component';


import './chat-box.styles.scss';

const ChatBox = ({messages, agentInfo}) => {

    const chatBoxEl = useRef(null);

    const [canAutoScroll, setCanAutoScroll] = useState(true);
    const [prevScrollTop, setPrevScrollTop] = useState(0);

    useEffect(()=>{
        checkScroll();
    });

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
    const handleScroll = ()=> {
        if(prevScrollTop){
            if(chatBoxEl.current.scrollTop < prevScrollTop){
                return setCanAutoScroll(false);
            }
            if(chatBoxEl.current.scrollTop + chatBoxEl.current.clientHeight >= chatBoxEl.current.scrollHeight){
                return setCanAutoScroll(true);
            }
        }
    }
    const checkScroll = ()=>{
        if((chatBoxEl.current.scrollTop + chatBoxEl.current.clientHeight <= chatBoxEl.current.scrollHeight) && canAutoScroll){
            chatBoxEl.current.scrollTop = chatBoxEl.current.scrollHeight;
            setPrevScrollTop(chatBoxEl.current.scrollTop);
        }
    }
    return(
        <div className="chat-box" ref={chatBoxEl} onScroll={handleScroll}>
            {buildMessages()}
        </div>
    );
}

export default ChatBox;
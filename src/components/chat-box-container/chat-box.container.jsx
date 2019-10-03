import React, {useState} from 'react';

import ChatBubble from '../chat-bubble/chat-bubble.component';
import ChatStartForm from '../chat-start-form/chat-start-form.component';
import ChatBoxHeader from '../chat-box-header/chat-box-header.component';

import './chat-box.container.styles.scss';

const ChatBoxContainer = ()=> {
    //on mount contact chat server?

    //is the chat box displayed
    const [isVisible, setIsVisible] = useState(false);

    const handleBubbleClick = ()=>{
        setIsVisible(true);
    }
    const handleCloseWindow = ()=> {
        setIsVisible(false);
    }
    const startChat = () => {
        console.log('Starting chat');
    }
    return(
        <div className={`${(isVisible ? "visible-chat" : null)} chat-box-container`}>
            { (!isVisible) ? <ChatBubble handleClick={handleBubbleClick}/> : null}
            { 
                (isVisible) ? 
                    <div className="chat-box-content">
                        <ChatBoxHeader handleCloseWindow={handleCloseWindow}/>
                        <ChatStartForm startChat={startChat}/>
                    </div>
                : 
                    null
            }
        </div>
    )
}

export default ChatBoxContainer;
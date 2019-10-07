import React, {useState, Fragment} from 'react';

import ChatBubble from '../chat-bubble/chat-bubble.component';
import ChatStartForm from '../chat-start-form/chat-start-form.component';
import ChatBoxHeader from '../chat-box-header/chat-box-header.component';
import ChatBox from '../chat-box/chat-box.component';

import './chat-box.container.styles.scss';

const ChatBoxContainer = ()=> {
    //on mount contact chat server?

    //is the chat box displayed
    const [isVisible, setIsVisible] = useState(false);
    const [isChatting, setIsChatting] = useState(false);

    const handleBubbleClick = ()=>{
        setIsVisible(true);
    }
    const handleCloseWindow = ()=> {
        setIsVisible(false);
        setIsChatting(false);
    }
    const startChat = () => {
        setIsChatting(true);
    }
    return(
        <div className={`${(isVisible ? "visible-chat" : null)} chat-box-container`}>
            { (!isVisible) ? <ChatBubble handleClick={handleBubbleClick}/> : null}
            { 
                (isVisible) ? 
                    <div className={(isChatting)?"chat-box-content":null}>
                        {(isChatting) ? (
                            <Fragment>
                                <Fragment>
                                    <ChatBoxHeader handleCloseWindow={handleCloseWindow} headerMessage="How can we help?" fixed/>
                                </Fragment>
                                <Fragment>
                                    <ChatBox/>
                                </Fragment>
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                <ChatBoxHeader handleCloseWindow={handleCloseWindow} headerMessage="How can we help?"/>
                                <ChatStartForm startChat={startChat}/>
                            </Fragment>
                        )
                        }

                    </div>
                : 
                    null
            }
        </div>
    )
}

export default ChatBoxContainer;
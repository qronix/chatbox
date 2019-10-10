import React, {useState, Fragment, useEffect} from 'react';

import ChatBubble from '../chat-bubble/chat-bubble.component';
import ChatStartForm from '../chat-start-form/chat-start-form.component';
import ChatBoxHeader from '../chat-box-header/chat-box-header.component';
import ChatBox from '../chat-box/chat-box.component';
import ChatBoxInput from '../chat-box-input/chat-box-input.component';

import './chat-box.container.styles.scss';

const ChatBoxContainer = ()=> {
    //on mount contact chat server?

    //is the chat box displayed
    const [isVisible, setIsVisible] = useState(false);
    const [isChatting, setIsChatting] = useState(false);
    const [agentInfo, setAgentInfo] = useState({
        name:null,
        photo:null
    });
    const [headerMessage, setHeaderMessage] = useState("How can we help?");
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        if(agentInfo.name !== null)
        setHeaderMessage(`Chatting with ${agentInfo.name}`);
    },[agentInfo.name]);

    const handleBubbleClick = () => {
        setIsVisible(true);
    }
    const handleCloseWindow = () => {
        console.log('Resetting!');
        setIsVisible(false);
        setIsChatting(false);
        setAgentInfo({name:null, photo:null});
        setHeaderMessage("How can we help?");
    }
    const startChat = () => {
        setIsChatting(true);
    }
    const handleMessage = data => {
        console.log('got a message!', data);
        const {type} = data;
        switch(type){
            case "initialize":
                setAgentInfo({name:data.name, photo:data.photo});
                break;
            default:
                return null;
        }
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
                                    <ChatBoxHeader handleCloseWindow={handleCloseWindow} headerMessage={headerMessage}/>
                                </Fragment>
                                <Fragment>
                                    <ChatBox handleMessage={handleMessage}/>
                                </Fragment>
                                <Fragment>
                                    <ChatBoxInput/>
                                </Fragment>
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                <ChatBoxHeader handleCloseWindow={handleCloseWindow} headerMessage={headerMessage}/>
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
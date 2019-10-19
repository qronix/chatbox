import React, {useState, Fragment, useEffect} from 'react';

import ChatBubble from '../chat-bubble/chat-bubble.component';
import ChatStartForm from '../chat-start-form/chat-start-form.component';
import ChatBoxHeader from '../chat-box-header/chat-box-header.component';
import ChatBox from '../chat-box/chat-box.component';
import ChatBoxInput from '../chat-box-input/chat-box-input.component';
import Socket from '../../utils/network';

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
    const [chatTopic, setChatTopic] = useState(null);
    const [userName, setUserName] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(()=>{
        if(isChatting && socket === null){
            console.log('Connecting....');
            const initialData = {
                type:'initialize',
                name:userName,
                topic:chatTopic
            }
            const socket = Socket(handleMessage, initialData);
            setSocket(socket);
        }
        if(!isChatting && socket !== null){
            socket.close();
            setSocket(null);
        }
        if(agentInfo.name !== null)
            setHeaderMessage(`Chatting with ${agentInfo.name}`);
    },[agentInfo.name, isChatting, chatTopic, socket, userName]);

    const handleBubbleClick = () => {
        setIsVisible(true);
    }
    const handleCloseWindow = () => {
        setIsVisible(false);
        setIsChatting(false);
        setAgentInfo({name:null, photo:null});
        setUserName(null);
        setChatTopic(null);
        setMessages([]);
        setHeaderMessage("How can we help?");
    }
    const startChat = values => {
        const {topic, name} = values;
        setChatTopic(topic);
        setUserName(name);
        setIsChatting(true);
    }
    const handleMessage = data => {
        console.log('Data :', data);
        const {type} = data;
        switch(type){
            case "initialize":
                setAgentInfo({name:data.name, photo:data.photo});
                break;
            case "chat":
                setMessages(prevMessages=>{
                    return [...prevMessages, data];
                });
                break;
            default:
                return null;
        }
    }

    const sendMessage = message => {
        const messageData = {type:"chat", message};
        if(message.length !== 0){
            socket.emit('message', messageData);
            handleMessage(messageData);
        }else{
            console.log('No message provided');
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
                                    <ChatBox handleMessage={handleMessage} userData={{name:userName, topic:chatTopic}} messages={messages} agentInfo={agentInfo}/>
                                </Fragment>
                                <Fragment>
                                    <ChatBoxInput sendMessage={sendMessage}/>
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
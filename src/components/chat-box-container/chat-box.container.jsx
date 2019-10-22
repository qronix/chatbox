import React, {useState, Fragment, useEffect} from 'react';

import ChatBubble from '../chat-bubble/chat-bubble.component';
import ChatStartForm from '../chat-start-form/chat-start-form.component';
import ChatBoxHeader from '../chat-box-header/chat-box-header.component';
import ChatBox from '../chat-box/chat-box.component';
import ChatBoxInput from '../chat-box-input/chat-box-input.component';
import Socket from '../../utils/network';

import './chat-box.container.styles.scss';

const ChatBoxContainer = ()=> {

    //is the chat box displayed
    const [isVisible, setIsVisible] = useState(false);
    //has the chat form been filled out and are we connected
    //to the chat server
    const [isChatting, setIsChatting] = useState(false);
    //info received from the chat server
    const [agentInfo, setAgentInfo] = useState({
        name:null,
        photo:null
    });

    const [headerMessage, setHeaderMessage] = useState("How can we help?");
    const [messages, setMessages] = useState([]);

    //form fields
    const [chatTopic, setChatTopic] = useState(null);
    const [userName, setUserName] = useState(null);

    const [socket, setSocket] = useState(null);

    useEffect(()=>{
        //if we have started chatting, but
        //do not currently have a server connection
        //send and initialization message to the server
        //and set the socket state
        if(isChatting && socket === null){
            const initialData = {
                type:'initialize',
                name:userName,
                topic:chatTopic
            }
            //setup socket connection, pass message handler
            //and the initialization data to send on connect
            const socket = Socket(handleMessage, initialData);
            //set socket state with returned socket
            setSocket(socket);
        }
        //close connection and reset state if we are no longer
        //chatting
        if(!isChatting && socket !== null){
            socket.close();
            setSocket(null);
        }
        if(agentInfo.name !== null)
            setHeaderMessage(`Chatting with ${agentInfo.name}`);
    },[agentInfo.name, isChatting, chatTopic, socket, userName]);

    //show chat container when the icon is clicked
    const handleBubbleClick = () => {
        setIsVisible(true);
    }
    //when the chat window is closed
    //reset the component state
    const handleCloseWindow = () => {
        setIsVisible(false);
        setIsChatting(false);
        setAgentInfo({name:null, photo:null});
        setUserName(null);
        setChatTopic(null);
        setMessages([]);
        setHeaderMessage("How can we help?");
    }
    //set chat state which triggers
    //a rerender because isChatting, chatTopic, and userName
    //are dependency variables for the useEffect function
    const startChat = values => {
        const {topic, name} = values;
        setChatTopic(topic);
        setUserName(name);
        setIsChatting(true);
    }

    //Self-explanatory, destructure message type 
    //and act accordingly
    const handleMessage = data => {
        const {type} = data;
        switch(type){
            case "initialize":
                setAgentInfo({name:data.name, photo:data.photo});
                break;
            case "chat":
                //push new message to state
                setMessages(prevMessages=>{
                    return [...prevMessages, data];
                });
                break;
            default:
                return null;
        }
    }

    //send message to server and push new message
    //to state
    const sendMessage = message => {
        const messageData = {type:"chat", message};
        if(message.length !== 0){
            socket.emit('message', messageData);
            handleMessage(messageData);
        }else{
            console.error('No message provided');
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
    );
}

export default ChatBoxContainer;
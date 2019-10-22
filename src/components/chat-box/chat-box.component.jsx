import React, { useRef, useEffect, useState } from "react";
import uuid from "uuid";

import ChatMessage from "../chat-message/chat-message.component";

import "./chat-box.styles.scss";

const ChatBox = ({ messages, agentInfo }) => {
  const chatBoxEl = useRef(null);

  //flag to determine if the window should autoscroll
  //this is set based on the position of the chat window
  //scrollTop versus the previous scrollTop position
  const [canAutoScroll, setCanAutoScroll] = useState(true);

  //track the chat window scrollTop variable to determine
  //if we should allow auto scrolling
  const [prevScrollTop, setPrevScrollTop] = useState(0);

  useEffect(() => {
    //Component is rerendered when a new message is added
    //to the message array in the chat container
    //this triggers
    checkScroll();
  });

  const buildMessages = () => {
    let chatMessages = [];
    for (let message in messages) {
      let chatMessage = null;
      if (messages[message].sender === "agent") {
        chatMessage = (
          <ChatMessage
            messageData={messages[message]}
            avatar={agentInfo.photo}
            key={uuid()}
          />
        );
      } else {
        chatMessage = (
          <ChatMessage
            messageData={messages[message]}
            avatar={null}
            key={uuid()}
          />
        );
      }
      chatMessages.push(chatMessage);
    }
    return chatMessages;
  };
  const handleScroll = () => {
    //if a previous scrollTop position exists
    //check if the current scrollTop position is less
    //than the previous position (user has scrolled up), if it is, trigger
    //the autoScroll flag to false. If the current scrollTop position
    //and the current clientHeight are greater than or equal to the
    //scrollHeight (scroll bar is at bottom of window), resume autoScrolling
    if (prevScrollTop) {
      if (chatBoxEl.current.scrollTop < prevScrollTop) {
        return setCanAutoScroll(false);
      }
      if (
        chatBoxEl.current.scrollTop + chatBoxEl.current.clientHeight >=
        chatBoxEl.current.scrollHeight
      ) {
        return setCanAutoScroll(true);
      }
    }
  };
  const checkScroll = () => {
    //if the scrollHeight of the chat window is greater than or
    //equal to the scrollTop + clientHeight
    //AND autoScroll is enabled => the user is not scrolling
    //then scroll to the bottom of the chat window
    if (
      chatBoxEl.current.scrollTop + chatBoxEl.current.clientHeight <=
      chatBoxEl.current.scrollHeight &&
      canAutoScroll
    ) {
      chatBoxEl.current.scrollTop = chatBoxEl.current.scrollHeight;
      setPrevScrollTop(chatBoxEl.current.scrollTop);
    }
  };
  return (
    <div className="chat-box" ref={chatBoxEl} onScroll={handleScroll}>
      {buildMessages()}
    </div>
  );
};

export default ChatBox;

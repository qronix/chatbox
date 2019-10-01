import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-solid-svg-icons';

import './chat-bubble.styles.scss';

const ChatBubble = ()=>(
    <div className="chat-bubble">
        <FontAwesomeIcon icon={faComment} className="chat-bubble-icon"/>
    </div>
)

export default ChatBubble;
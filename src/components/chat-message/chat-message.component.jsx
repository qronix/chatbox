import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
    avatar: {
        margin: 2,
        width: "2rem",
        height: "2rem",
        marginRight: "5px"
    },
    messageContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        margin: "0 auto",
        marginTop: "0.2em",
        padding: "2px",
        fontSize: "0.8em",
        textAlign: "left",
    },
    message: {
        width: "180px",
        backgroundColor: "#BCBBBB",
        borderRadius: "5%",
        padding: "5px",
        letterSpacing: "0.1em",
        wordBreak: "break-word",
    },
    agentMessage: {
        background: "linear-gradient(to right, rgba(235,255,138,1) 0%, rgba(182,238,104,1) 100%)"
    },
    userMessage: {
        background: "linear-gradient(to right, rgba(41,184,229,1) 0%, rgba(179,220,237,1) 100%);"
    }
});

const ChatMessage = ({ messageData: { message, sender }, avatar }) => {

    const classes = useStyles();
    return (
        <div className={classes.messageContainer}>
            {(avatar !== null)
                ? <Avatar src={avatar} alt="user avatar" className={classes.avatar} />
                : <Avatar src={null} alt="user avatar" className={classes.avatar}><FontAwesomeIcon icon={faUserCircle} className="chat-bubble-icon" /></Avatar>
            }
            <span className={`${classes.message} ${sender === "agent" ? classes.agentMessage : classes.userMessage}`}>{message}</span>
        </div>
    );
}

export default ChatMessage;
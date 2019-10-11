import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
    avatar:{
        margin:2,
        width:"2rem",
        height:"2rem",
        marginRight:"5px"
    },
    messageContainer:{
        display:"flex",
        justifyContent:"space-between",
        width:"100%",
        margin: "0 auto",
        marginTop:"0.2em",
        padding:"2px",
        fontSize:"0.8em",
        textAlign:"left",
    },
    message:{
        backgroundColor: "#BCBBBB",
        borderRadius:"5%",
        padding:"5px",
        letterSpacing:"0.1em",
        background: " linear-gradient(to right, rgba(235,255,138,1) 0%, rgba(182,238,104,1) 100%)",
    }
});

const ChatMessage = ({messageData, avatar}) => {

    const classes = useStyles();

    return(
        <div className={classes.messageContainer}>
            {(avatar!==null) 
                ? <Avatar src={avatar} alt="user avatar" className={classes.avatar}/> 
                : <Avatar src={<FontAwesomeIcon icon={faUserCircle} className="chat-bubble-icon"/>} alt="user avatar" className={classes.avatar}/> 
            
            }
            <span className={classes.message}>{messageData.message}</span>
        </div>
    );
}

export default ChatMessage;
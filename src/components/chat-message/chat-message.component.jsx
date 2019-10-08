import React, {useState, useEffect} from 'react';
import getAvatar from '../../utils/userAvatarAPI';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

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

const ChatMessage = ()=>{

    const [userImage, setUserImage] = useState(null);
    const classes = useStyles();

    useEffect(()=>{
        const getImage = async ()=>{
            const image = await getAvatar();
            setUserImage(image);
            console.log('image is', image);
        }
        getImage();
    },[]);

    return(
        <div className={classes.messageContainer}>
            <Avatar src={userImage} alt="user avatar" className={classes.avatar}/>
            <span className={classes.message}>Hello Sarah, I understand you are having issues with your subscription. Can you give me your account number?</span>
        </div>
    );
}

export default ChatMessage;
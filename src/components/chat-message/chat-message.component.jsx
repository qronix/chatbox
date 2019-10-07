import React, {useState, useEffect} from 'react';
import getAvatar from '../../utils/userAvatarAPI';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    avatar:{
        margin:10,
        width:"2rem",
        height:"2rem"
    },
    message:{
        backgroundColor: "#BCBBBB",
        width:"80%",
        height:"20%",
        margin: "0 auto",
        borderRadius:"10%",
        padding:"5px"
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
        <div className={classes.message}>
            <Avatar src={userImage} alt="user avatar" className={classes.avatar}/>
            <p>HELLO HOW CAN I HELP YOU?HELLO HOW CAN I HELP YOU?HELLO HOW CAN I HELP YOU?HELLO HOW CAN I HELP YOU?HELLO HOW CAN I HELP YOU?HELLO HOW CAN I HELP YOU?HELLO HOW CAN I HELP YOU?HELLO HOW CAN I HELP YOU?HELLO HOW CAN I HELP YOU?HELLO HOW CAN I HELP YOU?HELLO HOW CAN I HELP YOU?</p>
        </div>
    );
}

export default ChatMessage;
import React, { Fragment } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

const styles = makeStyles({
    chatInputContainer:{
        display:"flex",
        justifyContent:"space-between",
        height:"42px",
        position:"absolute",
        top: "calc(100% - 42px)",
        width:"200px"
    },
    sendButton:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"bottom",
        minHeight:0,
        height:"20px"
    },
    buttonIcon:{
        marginRight:"5px"
    },
    textField:{
        minHeight:0,
        // height:"42px"
    }
});

const ChatBoxInput = ()=>{
    const classes = styles();
    return(
        <form className={classes.chatInputContainer}>
            <TextField 
                id="user-input"
                className={classes.textField}
                variant="outlined"
                inputProps={{
                    style:{
                        height:"0px",
                        marginTop:"4px",
                        top:"2px"
                    }
                }}
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
            >
                <Fragment>
                    <FontAwesomeIcon icon={faPaperPlane} className={classes.buttonIcon}/>
                    <span>Send</span>
                </Fragment>
            </Button>
        </form>
    );
}

export default ChatBoxInput;
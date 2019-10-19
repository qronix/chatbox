import React, { Fragment, useState } from 'react';
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
    }
});

const ChatBoxInput = ({sendMessage})=>{
    const classes = styles();

    const [inputValue, setInputValue] = useState("");
    const [inputError, setInputError] = useState(false);

    const handleChange = (evt) => {
        const {value} = evt.target;
        if(inputError){
            setInputError(false);
        }
        setInputValue(value);
    }
    const validateInput = ()=> {
        console.log('Checking input value:', inputValue.length);
        if(inputValue.length===0){
            setInputError(true);
        }
        else{
            sendMessage(inputValue);
            setInputValue("");
        }
    }

    return(
        <form className={classes.chatInputContainer} onSubmit={(e)=>e.preventDefault()}>
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
                error={inputError}
                onChange={handleChange}
                value={inputValue}
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={validateInput}
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
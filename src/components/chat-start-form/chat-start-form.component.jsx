import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';

const styles = makeStyles(theme=>({
    formControl:{
        margin: theme.spacing(1),
        width:180
    },
    textField:{
        // margin: theme.spacing(1),
        minWidth:0,
        width:"70%"
    },
    container:{
        display:"flex",
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        width:"100%",
        margin:0,
        padding:"5%"
    },
    button:{
        minWidth: 0,
        width:"20%",
        height:"50%",
        fontSize:"0.6em",
        padding:"4px 20px",
        postion:"relative",
        top:10
    }
}));

const ChatStartForm = ()=> {
    const classes = styles();

    const [values, setValues] = useState({
        topic:'',
        name:''
    });

    const handleChange = evt => {
        evt.persist();
        setValues(oldValues=>({
            ...oldValues,
            [evt.target.name]: evt.target.value
        }));
    }
    return(
        <form autoComplete="off">
            <FormControl className={classes.formControl}>
                <Select
                    className={classes.select}
                    value={values.topic}
                    onChange={handleChange}
                    inputProps={{
                        name: 'topic',
                        id: 'topic-select'
                    }}
                >
                    <MenuItem value="account">Account Issues</MenuItem>
                    <MenuItem value="billing">Payment Issues</MenuItem>
                    <MenuItem value="plan">Plan Change Request</MenuItem>
                    <MenuItem value="support">Product Support</MenuItem>
                </Select>
            </FormControl>
            <Container className={classes.container}>
                <TextField
                    className={classes.textField}
                    inputProps={{
                        name:'name',
                        id:'chat-input'
                    }}
                    value={values.name}
                    onChange={handleChange}
                    margin="normal"
                    label="Enter your name"
                />
                <Button variant="contained" color="primary" className={classes.button}>Start Chat</Button>
            </Container>
           
        </form>
    );
}

export default ChatStartForm;
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import { Button } from '@material-ui/core';

const styles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        width: 180
    },
    textField: {
        minWidth: 0,
        width: "70%"
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
        margin: 0,
        padding: "5%"
    },
    button: {
        minWidth: 0,
        width: "20%",
        height: "50%",
        fontSize: "0.6em",
        padding: "4px 20px",
        postion: "relative",
        top: 10
    }
}));

const ChatStartForm = ({ startChat }) => {
    const classes = styles();
    const [values, setValues] = useState({
        topic: '',
        name: ''
    });
    const [validFields, setValidFields] = useState({
        topic: false,
        name: false
    });
    const [submittedForm, setSubmittedForm] = useState(false);

    useEffect(() => {
        if (submittedForm) {
            //Check for no errors in any form values
            const allFieldsAre = Object.keys(validFields).every(value => validFields[value] === false);
            if (allFieldsAre === true) startChat(values);
        }
    }, [validFields, submittedForm, startChat, values]);

    const handleChange = evt => {
        const { value, name } = evt.target;
        setValues(oldValues => ({
            ...oldValues,
            [name]: value
        }));
    }

    const validateForm = () => {
        let fields = {};
        for (let value in values) {
            fields[value] = (values[value] === '');
        }
        if (values.name.length < 2) fields.name = true;
        setValidFields((oldValues) => {
            return { ...oldValues, ...fields };
        });
        if (!submittedForm) setSubmittedForm(true);
    }

    return (
        <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <FormControl className={classes.formControl} error={validFields.topic}>
                <InputLabel htmlFor="topic-select">
                    Select a help topic
                </InputLabel>
                <Select
                    className={classes.select}
                    value={values.topic}
                    onChange={handleChange}
                    inputProps={{
                        name: 'topic',
                        id: 'topic-select'
                    }}
                    label="Select an issue"
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
                        name: 'name',
                        id: 'chat-input'
                    }}
                    value={values.name}
                    onChange={handleChange}
                    margin="normal"
                    label="Enter your name"
                    error={validFields.name}
                />
                <Button variant="contained" color="primary" className={classes.button} onClick={validateForm}>Start Chat</Button>
            </Container>
        </form>
    );
}

export default ChatStartForm;
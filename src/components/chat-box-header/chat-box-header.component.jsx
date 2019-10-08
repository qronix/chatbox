import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import './chat-box-header.styles.scss';

const useStyles = makeStyles(theme=>({
    button:{
        margin: theme.spacing(1),
        padding: "1px 10px",
        minHeight: 0,
        minWidth:0,
        // border: "1px solid blue",
    },
    container:{
        display:"grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridGap: theme.spacing(1),
        verticalAlign: "middle"
    },
    grid:{
        // border: "1px solid black",
        backgroundColor:"rgba(102, 102, 102, 1)",
        color: "white",
        // position: "fixed",
        zIndex:"999",
        // width:"200px",
    },
    gridFixed:{
        backgroundColor:"rgba(102, 102, 102, 1)",
        color: "white",
        position: "fixed",
        zIndex:"999",
        width:"200px",
    },
    p:{
        textAlign:"center",
        verticalAlign:"middle",
        // border:"1px solid green",
        fontSize: "0.9em",
        paddingTop:"6px",
        paddingLeft:"4px"
    }
}));

const ChatBoxHeader = ({handleCloseWindow, headerMessage, fixed})=> {
    const classes = useStyles();

    return(
        <Grid container className={(fixed)?classes.gridFixed:classes.grid}>
            <Grid container item xs={10}>
                {/* custom header content component necessary? */}
                <p className={classes.p}>{headerMessage}</p>
            </Grid>
            <Grid container item xs={2}>
                <Button 
                    color="secondary" 
                    variant="contained" 
                    className={classes.button} 
                    px={200} 
                    py={0}
                    onClick={()=>handleCloseWindow()}
                >
                    X
                </Button>
            </Grid>
        </Grid>
    );
};

export default ChatBoxHeader;
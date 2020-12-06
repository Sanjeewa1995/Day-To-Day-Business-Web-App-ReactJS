import { CircularProgress } from '@material-ui/core';
import React from 'react';

import classes from './LoadingScreen.module.css';

const LoadingScreen = ()=>{
    return (
        <div className={classes.root}>
            <div className={classes.loader}>
        <CircularProgress/>
        </div>
        </div>
    )
}

export default LoadingScreen;
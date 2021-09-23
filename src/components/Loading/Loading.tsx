import React from 'react'
import * as classes from './Loading.module.css';

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => {
    return <div className={classes.loader} />;
}
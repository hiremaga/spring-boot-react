import React from 'react';
import ReactDOM from 'react-dom';
import message from './message';

ReactDOM.render(
    <h1>{message}</h1>,
    document.querySelector('.container')
);
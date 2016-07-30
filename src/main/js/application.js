import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message';

let container = document.querySelector('.container');
if (container) {
    ReactDOM.render(<Message/>, container);
}

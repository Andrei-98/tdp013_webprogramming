import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

document.body.style = 'background: #121212; color: white';
document.body.classList.add('background-red');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

  
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PlayGround from './context/PlayGroundState';

ReactDOM.render(
   <PlayGround>
     <App />
   </PlayGround>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

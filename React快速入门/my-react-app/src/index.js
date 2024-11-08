import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // 快速入门
import CCAS from './CCAS/CCAS'
import reportWebVitals from './reportWebVitals';
import RHQ from './ReactHooksQuick/index'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RHQ />
    {/* <CCAS /> */}
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HeaderBar from "./HeaderBar"
import FooterArea from "./FooterArea"
import LoginApp from './LoginApp';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    {/* <HeaderBar></HeaderBar> */}
    <Router >
      <Route exact path="/" component={App} />
      <Route exact path="/loginPage" component={LoginApp} />
    </Router>

    {/* <App /> */}
    {/* <LoginApp /> */}
    <FooterArea />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();

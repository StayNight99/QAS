import React from 'react';
import logo from './logo.svg';
import './App.css';
import ufoLogo from './Image/ufo-removebg.png';

function App() {
  return (   
    <div className="App default-font">
      <header className="App-header">
        <img src={ufoLogo} className="App-logo" alt="logo" />
        <p>
          Foucs on the solution, not on the problem.
        </p>
        <a
          className="App-link"
          href="/loginPage"
          target="_self"
          rel="noopener noreferrer"
        >
          Question and Anwser Site(開放性知識分享平台)
        </a>
      </header>
    </div>
  );
}

export default App;

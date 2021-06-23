import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase';

import './styles/global.scss';

// Renders a JSX - JS w/ HTML - inner a DOM element
// First param: JSX
// Second param: Container (DOM element target)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
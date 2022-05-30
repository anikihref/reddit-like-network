import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import LoginedContext from './context/LoginedContext';
import MessagesContextProvider from './context/MessagesContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <MessagesContextProvider>
      <LoginedContext>
        <App />
      </LoginedContext>
    </MessagesContextProvider>
  </BrowserRouter>
);

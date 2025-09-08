import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { LinksProvider } from './context/LinksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*
      FIX: The <BrowserRouter> must wrap the entire <App /> component.
      This makes the routing context available to all components,
      including the Header and its <Link> elements.
    */}
    <BrowserRouter>
      <LinksProvider>
        <App />
      </LinksProvider>
    </BrowserRouter>
  </React.StrictMode>
);


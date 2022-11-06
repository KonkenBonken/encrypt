import React from 'react';
import ReactDOM from 'react-dom/client';

// import './index.scss';
import Caesar from './Caesar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Caesar />
  </React.StrictMode>
);
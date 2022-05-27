import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './views/App';
import 'antd/dist/antd.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
            <React.StrictMode>
                  <App />
            </React.StrictMode>
      </BrowserRouter>
);

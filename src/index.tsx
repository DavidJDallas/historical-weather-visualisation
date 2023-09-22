import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import router from './Routes/router';
import './General.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
 
  </React.StrictMode>
);



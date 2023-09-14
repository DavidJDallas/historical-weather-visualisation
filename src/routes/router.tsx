import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Route, Routes,createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import App from '../App';
import LandingPage from '../Components/LandingPage/Index';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
        <Route path="/" element={<App/>}/>
        

    </Route>
  ))

export default router;
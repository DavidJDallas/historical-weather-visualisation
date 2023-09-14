import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Route, Routes,createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import App from '../App';
import LandingPage from '../Components/LandingPage/Index';
import MainDashboard from '../Components/Dashboard/Index';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element={<App/>}>
        <Route path ='/:placeorpostcode' element={<MainDashboard/>}/>

    </Route>
  ))

export default router;
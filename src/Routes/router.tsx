import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Route, Routes,createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import App from '../App';
import LandingPage from '../Components/LandingPage/Index';
import MainDashboard from '../Components/Dashboard/Index';
import Rain from '../Components/Dashboard/Rain/IndexRain';
import Temperature from '../Components/Dashboard/Temperature/IndexTemperature';
import Wind from '../Components/Dashboard/Wind/IndexWind';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element={<App/>}>
        <Route path =':placeorpostcode' element={<MainDashboard/>}>
            <Route path='rain' element={<Rain/>}/>
            <Route path = 'wind' element={<Wind/>}/>
            <Route path = 'temperature' element={<Temperature/>}/>
        </Route>


    </Route>
  ))

export default router;
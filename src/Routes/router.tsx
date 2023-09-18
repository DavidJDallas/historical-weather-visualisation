import * as React from 'react';
import {Route,createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import App from '../App';
import MainDashboard from '../Components/Dashboard/Index';
import Rain from '../Components/Dashboard/Rain/IndexRain';
import Temperature from '../Components/Dashboard/Temperature/IndexTemperature';
import Wind from '../Components/Dashboard/Wind/IndexWind';
import ErrorScreen from '../Components/ErrorScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element={<App/>}>
        <Route path =':placeorpostcode' element={<MainDashboard/>}>
            <Route path='/:placeorpostcode/rain' element={<Rain/>}/>
            <Route path = '/:placeorpostcode/wind' element={<Wind/>}/>
            <Route path = '/:placeorpostcode/temperature' element={<Temperature/>}/>
        </Route>

      <Route path='*' element={<ErrorScreen/>}/>
    </Route>
  ))

export default router;
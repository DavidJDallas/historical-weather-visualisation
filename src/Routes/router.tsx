import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Route, Routes,createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import App from '../App';
import MainDashboard from '../Components/Dashboard/Index';
import Rain from '../Components/Dashboard/Rain/IndexRain';
import Temperature from '../Components/Dashboard/Temperature/IndexTemperature';
import Wind from '../Components/Dashboard/Wind/IndexWind';
import ErrorScreen from '../Components/ErrorScreen';
import LandingPage from '../Components/LandingPage/Index';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorScreen/>
  },
  {
    path: 'temperature',
    element: <Temperature/>,
    errorElement: <ErrorScreen/>    
  },
  {
    path: 'rain',
    element: <Rain/>,
    errorElement: <ErrorScreen/>
  },
  {
    path: 'wind',
    element: <Wind/>,
    errorElement: <ErrorScreen/>
  }
]
  )

export default router;
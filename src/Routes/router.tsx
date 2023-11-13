import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Route, Routes,createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import App from '../App';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" element={<App/>}>
       
    </Route>


  )
  )

export default router;
import React from 'react';
import NavBar from './NavBar';
import {MainDashboardProps} from './Types';
import * as d3 from 'd3';
import {DailyData} from '../../Services/ServicesTypes'

const MainDashboard = ({weatherData}: MainDashboardProps) => {

    console.log(weatherData)
    
    const initialFormatting = (weatherData: any) => {

       const parsedTime = d3.timeParse('%Y-%m-%d');
       const dates: any = weatherData.time.map(parsedTime)

       console.log(dates)

    }

    if(weatherData){

    initialFormatting(weatherData);
    }


    return(<>
    <h1>    Dashboard</h1>
    <NavBar/>
   


    </>)

}

export default MainDashboard;
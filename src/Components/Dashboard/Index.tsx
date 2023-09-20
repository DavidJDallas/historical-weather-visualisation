import React from 'react';
import NavBar from './NavBar';
import {MainDashboardProps, TwoDimArray} from './Types';
import * as d3 from 'd3';
import {DailyData} from '../../Services/ServicesTypes'
import { FormattedData } from './Types';
import { useState } from 'react';

const MainDashboard = ({weatherData}: MainDashboardProps) => {

    const [dataByYear, setDataByYear] = useState([]);
    const [dataByMonth, setDataByMonth] = useState([]);
    const [dataBySeason, setDataBySeason] = useState([]);

    const parsedTime = d3.timeParse('%Y-%m-%d');
    const dates = weatherData && weatherData.time.map(element => parsedTime(element)) as Date[]



    const initialFormatting = (data: DailyData): FormattedData[] => {

       return dates.map((date, i) => ({
                    date: date,
                    rain: data.rain_sum[i],
                    temperatureMax: data.temperature_2m_max[i],
                    temperatureMin: data.temperature_2m_min[i],
                    windspeed: data.windspeed_10m_max[i]
                }))
    }

    console.log(initialFormatting(weatherData))


    //Group data into years and format data this way. First, data is grouped into years using the d3 function getFullYear(). This creates a Map. The map is then converted into an Array, and then converted into an array of objects via the .map() function.

    const groupDataByYear = Array
                .from(d3.group(initialFormatting(weatherData), (d) => d.date.getFullYear()))
                .map((element, i) => ({
                        year: element[0],
                        data: element[1]
                     }))

    const groupDataByMonth = () => {

        let numberToMonthTranslator = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December'
        }

        return Array
                .from(d3.group(initialFormatting(weatherData), (d) => d.date.getMonth()))
                .map((element: TwoDimArray) => {
                    const monthIndex = element[0] as keyof typeof numberToMonthTranslator;
                   
                    return {
                 
                        month: numberToMonthTranslator[monthIndex],
                        data: element[1]
                }}
                )
    }

    groupDataByMonth()

    console.log(groupDataByYear)

    

    console.log(Array.from(groupDataByYear))  
    
    // const groupDataByMonth = d3.group(initialFormatting(weatherData), (d) => d.date.getMonth())

    // if(weatherData){
    //     initialFormatting(weatherData);
    // }


    return(<>
    <h1>    Dashboard</h1>
    <NavBar/>
   


    </>)

}

export default MainDashboard;
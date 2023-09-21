import React from 'react';
import NavBar from './NavBar';
import {GroupedDataByMonth, GroupedDataBySeason, GroupedDataByYear, MainDashboardProps, TwoDimArray} from './Types';
import * as d3 from 'd3';
import {DailyData} from '../../Services/ServicesTypes'
import { FormattedData } from './Types';
import { useState, useEffect } from 'react';


const MainDashboard = ({weatherData}: MainDashboardProps) => {

    const [dataByYear, setDataByYear] = useState<GroupedDataByYear[] | []>([]);
    const [dataByMonth, setDataByMonth] = useState<GroupedDataByMonth[] | []>([]);
    const [dataBySeason, setDataBySeason] = useState<GroupedDataBySeason | []>([]);

    const parsedTime = d3.timeParse('%Y-%m-%d');
    const dates = weatherData && weatherData.time.map(element => parsedTime(element)) as Date[]


    //Format the data from an object with arrays as values into an array of objects with each object corresponding to one day.

    const initialFormatting = (data: DailyData): FormattedData[] => {

       return dates.map((date, i) => ({
                    date: date,
                    rain: data.rain_sum[i],
                    temperatureMax: data.temperature_2m_max[i],
                    temperatureMin: data.temperature_2m_min[i],
                    windspeed: data.windspeed_10m_max[i]
                }))
    }

    const formattedData = initialFormatting(weatherData)


    //Group data into years and format data this way. First, data is grouped into years using the d3 function getFullYear(). This creates a Map. The map is then converted into an Array, and then converted into an array of objects via the .map() function.

    const groupDataByYear = (data: DailyData): void => {
        const dataGroupedByYear: GroupedDataByYear[] = Array
                                        .from(d3.group(formattedData, (d) => d.date.getFullYear()))
                                        .map((element, i) => ({
                                                year: element[0],
                                                data: element[1]
                                            }))

        setDataByYear(dataGroupedByYear)
    }   

    const groupDataByMonth = (data: DailyData): void => {

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

        const dataGroupedByMonth: GroupedDataByMonth[] = Array
                            .from(d3.group(formattedData, (d) => d.date.getMonth()))
                            .map((element: TwoDimArray) => {
                                const monthIndex = element[0] as keyof typeof numberToMonthTranslator;
                            
                                return {                 
                                    month: numberToMonthTranslator[monthIndex],
                                    data: element[1]
                                }}
                            )

        setDataByMonth(dataGroupedByMonth)                            
    }


    const groupDataBySeason = (data: FormattedData[]): void => {
        
         const seasonTranslator = {
            January: 'Winter',
            February: 'Winter',
            March: 'Spring',
            April: 'Spring',
            May: 'Spring',
            June: 'Summer',
            July: 'Summer',
            August: 'Summer',
            September: 'Autumn',
            October: 'Autumn',
            November: 'Autumn',
            December: 'Winter'
        }

    }

    useEffect(() => {
        groupDataByYear(weatherData)
        groupDataByMonth(weatherData)
        //groupDataBySeason(formattedData)
    }, [])





    return(<>
    <h1>    Dashboard</h1>
    <NavBar/>
   


    </>)

}

export default MainDashboard;
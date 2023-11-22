import React from 'react';
import NavBar from './NavBar';
import {GroupedDataByMonth, GroupedDataBySeason, GroupedDataByYear, MainDashboardProps, TwoDimArray} from './Types';
import * as d3 from 'd3';
import {DailyData} from '../../Services/ServicesTypes'
import { FormattedData } from './Types';
import { useState, useEffect } from 'react';
import {Route, Routes} from 'react-router-dom'
import Temperature from './Temperature/IndexTemperature';
import Rain from './Rain/IndexRain';
import './Dashboard.css'

const MainDashboard = ({weatherData}: MainDashboardProps) => {

    const [formattedData, setFormattedData] = useState<FormattedData[] | []>([]);
    const [dataBySeason, setDataBySeason] = useState<GroupedDataBySeason[] | []>([]);
    const [dataByMonth, setDataByMonth] = useState<GroupedDataByMonth[] | [] >([]);
    const [dataByYear, setDataByYear] = useState<GroupedDataByYear[] | []>([])
    

    const parsedTime = d3.timeParse('%Y-%m-%d');
    const dates = weatherData && weatherData.time.map(element => parsedTime(element)) as Date[]



    //Format the data from an object with arrays as values into an array of objects with each object corresponding to one day.

    const initialFormatting = (data: DailyData): FormattedData[] => {

       
            return dates.map((date, i) => ({
                    date: date,
                    rain: data.rain_sum[i],
                    temperatureMax: data.temperature_2m_max[i],                 
                }))
    }

    useEffect(() => {
        const initialData = initialFormatting(weatherData);
        setFormattedData(initialData);
    }, [])



    //Group data into years and format data this way. First, data is grouped into years using the d3 function getFullYear(). This creates a Map. The map is then converted into an Array, and then converted into an array of objects via the .map() function.

    const groupDataByYear = (data: FormattedData[]): GroupedDataByYear[] => {
        const dataGroupedByYear: GroupedDataByYear[] = Array
                                        .from(d3.group(data, (d) => d.date.getFullYear()))
                                        .map((element, i) => ({
                                                year: element[0],
                                                data: element[1]
                                            }))

        return dataGroupedByYear
    }   

    useEffect(() => {
        
        const dataByYear = groupDataByYear(formattedData);
        setDataByYear(dataByYear);
        
    }, [formattedData]);

    const groupDataByMonth = (data: FormattedData[]): GroupedDataByMonth[] => {

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
                            .from(d3.group(data, (d) => d.date.getMonth()))
                            .map((element: TwoDimArray) => {
                               
                                const monthIndex = element[0] as keyof typeof numberToMonthTranslator;                              
                                return {                 
                                    month: numberToMonthTranslator[monthIndex],
                                    data: element[1],
                                      
                                }}
                            )

        return dataGroupedByMonth;                           
    }

    useEffect(() => {
        const groupedDataByMonth = groupDataByMonth(formattedData);
        setDataByMonth(groupedDataByMonth);
        
    }, [formattedData])

    const groupDataBySeason = (data: FormattedData[]): GroupedDataBySeason[] => {
  

    const groupedByMonth = groupDataByMonth(data);
    
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

        const replaceMonthsWithSeasons = groupedByMonth.map((element: GroupedDataByMonth) => {
                    const seasonIndex = element.month as keyof typeof seasonTranslator;            
                        return{
                            season: seasonTranslator[seasonIndex],
                            data: element.data
                        }
                        
        })

        return Array
                .from(d3.group(replaceMonthsWithSeasons, d=> d.season))
                .map((season) => {
                    return{
                        season: season[0],
                        data: season[1].flatMap(element => element.data)
                    }
                })
    }

    useEffect(() => {
        const groupedBySeason = groupDataBySeason(formattedData);
        setDataBySeason(groupedBySeason);
    }, [formattedData])
        


    return(<>

    <NavBar/>
        <div className='dashboard-container'>
        <Routes>            
            <Route path="/temp" element={<Temperature
                dataBySeason ={dataBySeason}
                dataByMonth = {dataByMonth}
                dataByYear = {dataByYear}
                formattedData = {formattedData}
            />}/>           
            <Route path ="/rain" element={<Rain
            dataBySeason ={dataBySeason}
            dataByMonth = {dataByMonth}
            dataByYear = {dataByYear}
            formattedData = {formattedData}
            
            />}/>
        </Routes>
        </div>

   


    </>)

}

export default MainDashboard;
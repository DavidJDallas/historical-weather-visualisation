import React from 'react';
import NavBar from './NavBar';
import {GroupedDataByMonth, GroupedDataBySeason, GroupedDataByYear, MainDashboardProps, TwoDimArray} from './Types';
import * as d3 from 'd3';
import {DailyData} from '../../Services/ServicesTypes'
import { FormattedData } from './Types';
import { useState, useEffect, useContext, useMemo } from 'react';
import {Route, Routes} from 'react-router-dom'
import Temperature from './Temperature/IndexTemperature';
import Rain from './Rain/IndexRain';
import './Dashboard.css'
import {Container, Row, Col} from 'react-bootstrap';
import SaveChartData from './SaveChartData';
import { SearchContext } from '../../Context/SearchContext';
import { SearchContextProps } from '../../Context/ContextTypes';
import { formatData } from '../../Utils/InitialDataFormatting/FormattedData';
import { groupDataByYear } from '../../Utils/InitialDataFormatting/GroupDataByYear';

const MainDashboard = (): JSX.Element => {

    const searchContext: SearchContextProps = useContext<SearchContextProps>(SearchContext);
    const {weatherData} = searchContext

    const [dataBySeason, setDataBySeason] = useState<GroupedDataBySeason[] | []>([]);
    const [dataByMonth, setDataByMonth] = useState<GroupedDataByMonth[] | [] >([]);
    const [dataByYear, setDataByYear] = useState<GroupedDataByYear[] | []>([])
    const [weatherTypeSelected, setWeatherTypeSelected] = useState<boolean>(false);
    
    console.log(weatherData)
 
    const formattedData = useMemo(() => {
       return formatData(weatherData)
    }, [weatherData]);



    //Group data into years and format data this way. First, data is grouped into years using the d3 function getFullYear(). This creates a Map. The map is then converted into an Array, and then converted into an array of objects via the .map() function.



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
    }, [formattedData]);    

   

    return(<>
    <Container>
    <Row>
     

      
            <NavBar
                weatherTypeSelected={weatherTypeSelected}
                setWeatherTypeSelected={setWeatherTypeSelected}
            />

            <SaveChartData
            />

            <div className='dashboard-container'>
                {!weatherTypeSelected ?
                    <h3>Choose whether you would like to see patterns in weather for temperature or rain. Customise these as you like via various parameters.</h3>
                    :
                    <Routes>
                        <Route path="/temp" element={
                            <Temperature
                                dataBySeason={dataBySeason}
                                dataByMonth={dataByMonth}
                                dataByYear={dataByYear}
                                formattedData={formattedData}
                            />
                        } />
                        <Route path="/rain" element={
                            <Rain
                                dataBySeason={dataBySeason}
                                dataByMonth={dataByMonth}
                                dataByYear={dataByYear}
                                formattedData={formattedData}
                            />
                        } />
                    </Routes>
                }
            </div>
        
    </Row>
</Container>

   


    </>)

}

export default MainDashboard;
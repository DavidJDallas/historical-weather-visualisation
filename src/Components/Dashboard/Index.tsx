import React from 'react';
import NavBar from './NavBar';
import {GroupedDataByMonth, GroupedDataBySeason, GroupedDataByYear, MainDashboardProps, TwoDimArray} from './Types';
import * as d3 from 'd3';
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
import { groupDataByYear} from '../../Utils/InitialDataFormatting/GroupDataByYear';
import { groupDataByMonth } from '../../Utils/InitialDataFormatting/GroupDataByMonth';
import { groupDataBySeason } from '../../Utils/InitialDataFormatting/GroupDataBySeason';

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

  
    useEffect(() => {
        const groupedDataByMonth = groupDataByMonth(formattedData);
        setDataByMonth(groupedDataByMonth);
        
    }, [formattedData])

    
    useEffect(() => {
        const groupedBySeason = groupDataBySeason(formattedData, groupDataByMonth);
        setDataBySeason(groupedBySeason);
    }, [formattedData]);    

   

    return(<>
    <Container>
    <Row>      
            <NavBar
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
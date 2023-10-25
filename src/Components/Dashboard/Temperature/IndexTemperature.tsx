import React from 'react';
import {TemperatureProps} from './Types'
import {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CheckForm from '../CheckForm';
import RangeSliderTemp from './RangeSliderTemp';
import TempByMonth from './TempByMonth';


const Temperature = ({dataByYear, dataByMonth, dataBySeason, formattedData}: TemperatureProps) => {

    const [displayTempBySeasonAverage, setDisplayTempBySeasonAverage] = useState<boolean>(true);
    const [displayTempByMonthAverage, setDisplayTempByMonthAverage] = useState<boolean>(true);
    const [yearValue, setYearValue] = useState<number>(1942)
    
    console.log(yearValue);



    return(
        <>
        <Container fluid={true}>
            <Row className='check-form-row'>
                <CheckForm
                    displayTempByMonthAverage={displayTempByMonthAverage}
                    displayTempBySeasonAverage={displayTempBySeasonAverage}
                    setDisplayTempByMonthAverage={setDisplayTempByMonthAverage}
                    setDisplayTempBySeasonAverage={setDisplayTempBySeasonAverage}
                />
            </Row>
            <Row >
                <RangeSliderTemp
                    yearValue ={yearValue}
                    setYearValue = {setYearValue}
                />
            </Row>
            <Row>
                <TempByMonth
                    dataByMonth={dataByMonth}
                    width={400}
                    height={250}
                    yearValue={yearValue}
                />

            </Row>
        </Container>       
        </>
    )
}

export default Temperature
import React from 'react';
import {TemperatureProps} from './Types'
import {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CheckForm from '../CheckForm';
import RangeSliderTemp from './RangeSliderTemp';


const Temperature = ({groupDataBySeason, groupDataByMonth, groupDataByYear, formattedData}: TemperatureProps) => {

    const [displayTempBySeasonAverage, setDisplayTempBySeasonAverage] = useState<boolean>(true);
    const [displayTempByMonthAverage, setDisplayTempByMonthAverage] = useState<boolean>(true);
    const [yearValue, setYearValue] = useState<number>(1942)
    
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


        </Container>
       
        </>
    )
}

export default Temperature
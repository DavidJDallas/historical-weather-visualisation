import React from 'react';
import { IndexProps } from './RainTypes';
import RainByMonth from './RainByMonth';
import { Container, Row, Col } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import CheckFormRain from './CheckFormRain';
import RangeSliderRain from './RangeSliderRain';

const Rain = ({dataBySeason, dataByMonth, dataByYear, formattedData}: IndexProps): JSX.Element => {

    const [displayRainBySeasonAverage, setDisplayRainBySeasonAverage] = useState<boolean>(true);
    const [displayRainByMonthAverage, setDisplayRainByMonthAverage] = useState<boolean>(true);
    const [displayRainByYearAverage, setDisplayRainByYearAverage] = useState<boolean>(true);
    const [yearValue, setYearValue] = useState<number>(1942)



    return(<>
   
    <Container fluid={true}>
    <Row >
                <div className= 'checkbox-container'>
                     <CheckFormRain
                    displayRainByMonthAverage={displayRainByMonthAverage}
                    displayRainBySeasonAverage={displayRainBySeasonAverage}
                    setDisplayRainByMonthAverage={setDisplayRainByMonthAverage}
                    setDisplayRainBySeasonAverage={setDisplayRainBySeasonAverage}
                    displayRainByYearAverage = {displayRainByYearAverage}
                    setDisplayRainByYearAverage ={setDisplayRainByYearAverage}
                    />
                </div>
               
            </Row>
            <Row>
                <RangeSliderRain
                    yearValue={yearValue}
                    setYearValue={setYearValue}
                />


            </Row>
        <RainByMonth/>

    </Container>

    


    </>)
}

export default Rain
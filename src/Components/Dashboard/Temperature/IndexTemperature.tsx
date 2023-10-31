import React from 'react';
import {TemperatureProps} from './Types'
import {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CheckForm from '../CheckForm';
import RangeSliderTemp from './RangeSliderTemp';
import TempByMonth from './TempByMonth';
import TempBySeason from './TempBySeason';
import './TempStyling.css'
import TempByYear from './TempByYear';


const Temperature = ({dataByYear, dataByMonth, dataBySeason, formattedData}: TemperatureProps) => {

    const [displayTempBySeasonAverage, setDisplayTempBySeasonAverage] = useState<boolean>(true);
    const [displayTempByMonthAverage, setDisplayTempByMonthAverage] = useState<boolean>(true);
    const [yearValue, setYearValue] = useState<number>(1942)
    
    return(
        <>
        <Container fluid={true}>
            <Row >
                <div className= 'checkbox-container'>
                     <CheckForm
                    displayTempByMonthAverage={displayTempByMonthAverage}
                    displayTempBySeasonAverage={displayTempBySeasonAverage}
                    setDisplayTempByMonthAverage={setDisplayTempByMonthAverage}
                    setDisplayTempBySeasonAverage={setDisplayTempBySeasonAverage}
                />
                </div>
               
            </Row>
            <Row >
                <RangeSliderTemp
                    yearValue ={yearValue}
                    setYearValue = {setYearValue}
                />
            </Row>
            <Row
            style={{height: '300px'}}
            >
               
                    {displayTempByMonthAverage &&   
                    <Col>
                        <TempByMonth
                            dataByMonth={dataByMonth}
                            width={400}
                            height={250}
                            yearValue={yearValue}
                        /> 
                    </Col>
                    }
                   
               {displayTempBySeasonAverage && 
                <Col>
                
                <TempBySeason
                    dataBySeason={dataBySeason}
                    width={400}
                    height={250}
                    yearValue={yearValue}                    
                /> 
                </Col>
                }
            </Row>
            <Row
            style={{height: '300px'}}
            >
                <Col>
                    <TempByYear
                        dataByYear={dataByYear}
                        width={400}
                        height={250}
                    />
                </Col>

            </Row>
        </Container>       
        </>
    )
}

export default Temperature
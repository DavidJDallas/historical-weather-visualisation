import React from 'react';
import {TemperatureProps} from './Types'
import {useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CheckForm from './CheckFormTemperature';
import RangeSliderTemp from './RangeSliderTemp';
import TempByMonth from './TempByMonth';
import TempBySeason from './TempBySeason';
import './TempStyling.css'
import TempByYear from './TempByYear';

const Temperature = ({dataByYear, dataByMonth, dataBySeason, formattedData}: TemperatureProps) => {

    const [displayTempBySeasonAverage, setDisplayTempBySeasonAverage] = useState<boolean>(true);
    const [displayTempByMonthAverage, setDisplayTempByMonthAverage] = useState<boolean>(true);
    const [displayTempByYearAverage, setDisplayTempByYearAverage] = useState<boolean>(true);
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
                    displayTempByYearAverage = {displayTempByYearAverage}
                    setDisplayTempByYearAverage ={setDisplayTempByYearAverage}
                    />
                </div>
               
            </Row>
            <Row >
                <RangeSliderTemp
                    yearValue ={yearValue}
                    setYearValue = {setYearValue}
                />
            </Row>
            {displayTempByMonthAverage || displayTempBySeasonAverage ?
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
            : null}
            
            <Row
            style={{height: '500px', marginLeft: '100px'}}
            >
                {displayTempByYearAverage && 
                    <Col>
                        <TempByYear
                            dataByYear={dataByYear}
                            width={800}
                            height={400}
                            yearValue={yearValue}
                        />
                    </Col>
                }
            </Row>
        </Container>       
        </>
    )
}

export default Temperature
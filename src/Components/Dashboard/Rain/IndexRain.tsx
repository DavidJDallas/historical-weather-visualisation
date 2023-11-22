import React from 'react';
import { IndexProps } from './RainTypes';
import RainByMonth from './RainByMonth';
import { Container, Row, Col } from 'react-bootstrap';
import {useState} from 'react';
import CheckFormRain from './CheckFormRain';
import RangeSliderRain from './RangeSliderRain';
import RainBySeason from './RainBySeason';
import RainByYear from './RainByYear';

const Rain = ({dataBySeason, dataByMonth, dataByYear, formattedData}: IndexProps): JSX.Element => {

    const [displayRainBySeasonAverage, setDisplayRainBySeasonAverage] = useState<boolean>(true);
    const [displayRainByMonthAverage, setDisplayRainByMonthAverage] = useState<boolean>(true);
    const [displayRainByYearAverage, setDisplayRainByYearAverage] = useState<boolean>(true);
    const [yearValue, setYearValue] = useState<number>(1942)



    console.log(displayRainByYearAverage)
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
            {displayRainByMonthAverage || displayRainBySeasonAverage ?  
            <Row
            style={{height: '300px'}}>
                {displayRainByMonthAverage &&    
                <Col>
                    <RainByMonth
                                dataByMonth={dataByMonth}
                                width={400}
                                height={250}
                                yearValue={yearValue}
                            />
                </Col>}
                    {displayRainBySeasonAverage && 
                     <Col>
                        <RainBySeason
                            dataBySeason={dataBySeason}
                            yearValue={yearValue}
                            width={400}
                            height={250}
                        />
                    </Col>
                    }
               
                
            </Row> 
            : null    
        }
          {displayRainByYearAverage &&  
          <Row
            style={{height: '500px', marginLeft: '100px'}}
            >
                <Col> 
                    <RainByYear
                        yearValue={yearValue}
                        width={800}
                        height={400}
                        dataByYear={dataByYear}
                    />
                </Col>
              

            </Row>
      }
           
        

    </Container>

    


    </>)
}

export default Rain
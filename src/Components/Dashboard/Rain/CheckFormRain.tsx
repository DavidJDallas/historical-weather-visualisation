import * as React from 'react';
import {Form} from 'react-bootstrap';
import { CheckFormRainProps } from './RainTypes';


const CheckFormRain = ({displayRainByMonthAverage, displayRainBySeasonAverage, displayRainByYearAverage, setDisplayRainByMonthAverage, setDisplayRainBySeasonAverage, setDisplayRainByYearAverage}: CheckFormRainProps): JSX.Element => {

    const handleChangeRainMonthAverage = (): void => {
        setDisplayRainByMonthAverage(!displayRainByMonthAverage)    
    }
    const handleChangeRainSeasonAverage = (): void => {
        setDisplayRainBySeasonAverage(!displayRainBySeasonAverage)
    }

    const handleChangeRainYearAverage = ():void => {
      setDisplayRainByYearAverage(!displayRainByYearAverage)
    }

    return(
        <>
          <Form>
        <div className="mb-3">  
        <Form.Check
            inline = {true}
            label="Average Rainfall By Season"
            name="group1"
            type={'checkbox'}
            id={`inline-${'checkbox'}-2`}
            onChange={handleChangeRainSeasonAverage}
            defaultChecked
          />
          
          <Form.Check
            inline = {true}
            label="Average Rainfall by Month"
            name="group1"
            type={'checkbox'}
            id={`inline-${'checkbox'}-1`}
            onChange={handleChangeRainMonthAverage}
            defaultChecked
            
          />
             <Form.Check
            inline = {true}
            label="Average Rainfall by Year"
            name="group1"
            type={'checkbox'}
            id={`inline-${'checkbox'}-1`}
            onChange={handleChangeRainYearAverage}
            defaultChecked
            
          />
        </div>
    </Form>
        </>
    )
}

export default CheckFormRain;
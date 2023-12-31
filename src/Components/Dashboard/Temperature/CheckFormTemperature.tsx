import * as React from 'react';
import {Form} from 'react-bootstrap';

import { CheckFormProps } from '../Types';

const CheckFormTemp = ({
    displayTempByMonthAverage, 
    displayTempByYearAverage, 
    displayTempBySeasonAverage, 
    setDisplayTempByYearAverage, 
    setDisplayTempByMonthAverage, 
    setDisplayTempBySeasonAverage
}: CheckFormProps): JSX.Element => {

    const handleChangeTempMonthAverage = (): void => {
        setDisplayTempByMonthAverage(!displayTempByMonthAverage)    
    }
    const handleChangeTempSeasonAverage = (): void => {
        setDisplayTempBySeasonAverage(!displayTempBySeasonAverage)
    }

    const handleChangeTempYearAverage = ():void => {
      setDisplayTempByYearAverage(!displayTempByYearAverage)
    }
   

    return(
        <>
       <Form>
        <div className="mb-3">  
        <Form.Check
            inline = {true}
            label="Average Temperature By Season"
            name="group1"
            type={'checkbox'}
            id={`inline-${'checkbox'}-2`}
            onChange={handleChangeTempSeasonAverage}
            defaultChecked
          />
          
          <Form.Check
            inline = {true}
            label="Average Temperature by Month"
            name="group1"
            type={'checkbox'}
            id={`inline-${'checkbox'}-1`}
            onChange={handleChangeTempMonthAverage}
            defaultChecked
            
          />
             <Form.Check
            inline = {true}
            label="Average Temperature by Year"
            name="group1"
            type={'checkbox'}
            id={`inline-${'checkbox'}-1`}
            onChange={handleChangeTempYearAverage}
            defaultChecked
            
          />
        
        </div>
    </Form>
      </>
    )
}

export default CheckFormTemp
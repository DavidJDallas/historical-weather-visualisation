import * as React from 'react';
import {Form} from 'react-bootstrap/';
import { useContext} from 'react';
import {YearContext} from '../../../Context/Context';
import {YearContextType} from '../../../Context/ContextTypes';
import './TempStyling.css'
import { MDBRange } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import { RangeSliderProps } from './Types';

const RangeSliderTemp = ({yearValue, setYearValue}: RangeSliderProps) => {   


    let years = [];
    for (let i = 1945; i <= 2023; i++) {
       years.push(i);
    }

    const handleSliderChange = (event: any) => {
        setYearValue(event.target.value)
    }

    


    return(
        <>
        <Form.Label>Select how far back you would like to see data for</Form.Label>
       
        <MDBRange
      defaultValue={yearValue}
      onChange={handleSliderChange}
      min='1941'
      max='2022'
      id='customRange'
      
    />
      
        </>
    )

}

export default RangeSliderTemp
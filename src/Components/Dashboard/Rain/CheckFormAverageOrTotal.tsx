import * as React from 'react';
import {Form} from 'react-bootstrap';
import { CheckFormAverageOrTotalProps } from './RainTypes';
import { MDBBtn } from 'mdb-react-ui-kit';

const CheckFormAverageOrTotal = ({averageOrTotal, setAverageOrTotal}: CheckFormAverageOrTotalProps) => {
    console.log(averageOrTotal)
    const handleToggle = () => {
        if(averageOrTotal === 'average'){
            setAverageOrTotal('total');
        } else{
            setAverageOrTotal('average');
        }
    }
    
    return(
        <>
          
        </>
    )
}

export default CheckFormAverageOrTotal
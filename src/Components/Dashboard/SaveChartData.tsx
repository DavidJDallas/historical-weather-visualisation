import * as React from 'react';
import { Button } from 'react-bootstrap';
import { SaveChartDataProps } from './Types';

const SaveChartData = ({weatherData}: SaveChartDataProps) => {

    const handleClick = () => {
        console.log('done')
    }

    return(
        <>
        <div className='button-div'>
            <Button
                onClick = {() => handleClick()}
            >
            <h5>Save Data From This Search</h5>
        </Button>
        </div>
        
        
        </>
    )
}

export default SaveChartData
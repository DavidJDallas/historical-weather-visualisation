import * as React from 'react';
import { Button } from 'react-bootstrap';

const SaveChartData = () => {

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
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { SaveChartDataProps } from './Types';
import { getGeoLocationData } from '../../Utils/getGeoLocationData';
import { LatAndLong } from '../../Services/ServicesTypes';
import { useContext } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { SearchContextProps } from '../../Context/ContextTypes';
import { useRateLimiter } from '../../Services/RateLimiter';


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
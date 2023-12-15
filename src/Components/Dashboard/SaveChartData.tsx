import * as React from 'react';
import { Button } from 'react-bootstrap';
import { SaveChartDataProps } from './Types';
import { useContext } from 'react';
import { SearchContext } from '../../Context/SearchContext';
import { SearchContextProps } from '../../Context/ContextTypes';
import { postHistoricalWeatherData } from '../../Services/APICalls';

const SaveChartData = () => {

    const searchContext: SearchContextProps = useContext<SearchContextProps>(SearchContext);
    const {place, postcode, weatherData} = searchContext;

    //Next: Work out how I'm going to reference the stored data in future calls. How will I know what I'm calling on the backend DB? Maybe just a request for get all and have it on the backend that data is temporary and gets wiped after every session? And create an endpoint on backend for users to delete all data or delete last data, in which case the last data point would just easily be accessed via the only local storage?
    
    const handleClick = () => {
        postHistoricalWeatherData(weatherData)
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
import React from 'react';
import {HeaderProps} from './Types';
import './Header.css'

const Header = ({place, postcode, formSubmitted}: HeaderProps): JSX.Element => {    


    const formattedPostcode: string | undefined = postcode ? postcode.toUpperCase() : undefined;

    const formattedPlace: string | undefined = place ? place[0].toUpperCase() + place.slice(1).toLowerCase() : undefined;       


    return(<>
    <div className='header'>
        {
            formSubmitted ? 
            <h1>Weather Data for {formattedPlace || formattedPostcode}</h1>    
            :
            <h1>Explore Trends in Weather Across Custom Timeframes </h1>
        }      
    </div>
    </>)
}

export default Header;
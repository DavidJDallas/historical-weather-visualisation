import React from 'react';
import {HeaderProps} from './Types';

const Header = ({place, postcode, formSubmitted}: HeaderProps) => {    


    const formattedPostcode: string | undefined = postcode ? postcode.toUpperCase() : undefined;

    const formattedPlace: string | undefined = place ? place[0].toUpperCase() + place.slice(1).toLowerCase() : undefined;       


    return(<>
    {
        formSubmitted ? 
        <h1>Weather Data for {formattedPlace || formattedPostcode}</h1>    
        :
        <h1>Global Weather Pattern Visualization: Explore Trends in Weather Across Custom Timeframes </h1>
    }      
 
    </>)
}

export default Header;
import React from 'react';
import {HeaderProps} from './Types';

const Header = ({place, postcode}: HeaderProps) => {    

    return(<>
    {place || postcode ? <h1>Weather Data for {place || postcode}</h1> :    
    <h1>Global Weather Pattern Visualization: Explore Trends in Weather Across Custom Timeframes</h1>}
 
    </>)
}

export default Header;
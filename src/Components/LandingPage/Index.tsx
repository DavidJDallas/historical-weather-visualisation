import React from 'react';
import {Container } from 'react-bootstrap';
import './LandingPage.css';
import LandingPageSearch from './Search';
import { IndexProps } from './LandingPageTypes';
import { FormEvent } from 'react';
import { getGeoLocationData } from '../../Utils/getGeoLocationData';
import { getGeoLocation } from '../../Services/APICalls';

const LandingPage = ({postcode, place, setLatAndLong}: IndexProps): JSX.Element => {
  
  const handlePostcodeSubmit = (): void => {    
    getGeoLocationData(postcode, place, setLatAndLong, getGeoLocation);
  }

  const handlePlacesubmit = (): void => {   
    getGeoLocationData(postcode, place, setLatAndLong, getGeoLocation);
  }
    return(<>

    <div className='landing-page-search'>
  
    <h2>Enter the Postcode or Place you would Like to see Data for</h2>
    
      <Container className='search-box'>
        <LandingPageSearch
          handlePostcodeSubmit={handlePostcodeSubmit}
          handlePlaceSubmit={handlePlacesubmit}
   
        />
      </Container>
        </div>

    </>
    )
};

export default LandingPage;
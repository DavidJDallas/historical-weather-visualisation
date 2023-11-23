import React from 'react';
import {Container } from 'react-bootstrap';
import './LandingPage.css';
import LandingPageSearch from './Search';
import { IndexProps } from './LandingPageTypes';

const LandingPage = ({getGeoLocationData, setPlace, setPostcode}: IndexProps): JSX.Element => {
  
  const handlePostcodeSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    getGeoLocationData();
  }

  const handlePlacesubmit = (event: React.SyntheticEvent) => {
   
    event.preventDefault();
    getGeoLocationData();
  }
    return(<>

    <div className='landing-page-search'>
  
    <h2>Enter the Postcode or Place you would Like to see Data for</h2>
    
      <Container className='search-box'>
        <LandingPageSearch
          handlePostcodeSubmit={handlePostcodeSubmit}
          handlePlaceSubmit={handlePlacesubmit}
          setPlace={setPlace}
          setPostcode={setPostcode}
        />
      </Container>
        </div>

    </>
    )
};

export default LandingPage;
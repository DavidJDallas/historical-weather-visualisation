import React from 'react';
import {Container } from 'react-bootstrap';
import './LandingPage.css';
import LandingPageSearch from './Search';
import { IndexProps } from './LandingPageTypes';
import { FormEvent } from 'react';

const LandingPage = ({getGeoLocationData,  setPostcode, postcode}: IndexProps): JSX.Element => {
  
  const handlePostcodeSubmit = (): void => {    
    getGeoLocationData();
  }

  const handlePlacesubmit = (): void => {   
    getGeoLocationData();
  }
    return(<>

    <div className='landing-page-search'>
  
    <h2>Enter the Postcode or Place you would Like to see Data for</h2>
    
      <Container className='search-box'>
        <LandingPageSearch
          handlePostcodeSubmit={handlePostcodeSubmit}
          handlePlaceSubmit={handlePlacesubmit}
        
          setPostcode={setPostcode}
          postcode={postcode}
   
        />
      </Container>
        </div>

    </>
    )
};

export default LandingPage;
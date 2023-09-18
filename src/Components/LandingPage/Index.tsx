import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container, Row, Col} from 'react-bootstrap';
import './LandingPage.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LandingPageSearch from './Search';
import {useState} from 'react';
import { IndexProps } from './LandingPageTypes';

const LandingPage = ({getGeoLocationData, setPlace, setPostcode}: IndexProps) => {

  
  const handlePostcodeSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    getGeoLocationData();
  }

  const handlePlacesubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    getGeoLocationData();
  }
    return(<>
    <h1>Enter the Postcode or Place you would Like to see Data for</h1>
    
      <Container className='d-flex'>
      <LandingPageSearch
        handlePostcodeSubmit={handlePostcodeSubmit}
        handlePlaceSubmit={handlePlacesubmit}
        setPlace={setPlace}
        setPostcode={setPostcode}
      />
      </Container>
      
   
 
    </>
    )
};

export default LandingPage;
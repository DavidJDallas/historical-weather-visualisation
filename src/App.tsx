import React, { ReactNode } from 'react';
import { getGeoLocationByPostcode, getHistoricalWeatherData } from './Services/APICalls';
import LandingPage from './Components/LandingPage/Index';
import Header from './Components/Header/Index';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap'



const App = (): JSX.Element => {

  const [postcode, setPostcode] = useState<string>('');
  const [place, setPlace] = useState<string>('');

 
  getGeoLocationByPostcode('BN20 8dy')

  getHistoricalWeatherData('50.768480', '0.254930', 1989, 'celsius')

  return (
  <div className='main-app '>
    <Container className=''>
      <Row className='d-flex flex-row'>
          <Header
          postcode={postcode}
          place={place}
          />
      </Row>
      <Row className='d-flex flex-row'>
        <LandingPage
        setPostcode={setPostcode}
        setPlace={setPlace}
        />
      </Row>
      
    
    </Container>
  
  </div>
  );
}

export default App;

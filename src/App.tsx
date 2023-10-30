import React, { ReactNode } from 'react';
import { getGeoLocation, getHistoricalWeatherData } from './Services/APICalls';
import LandingPage from './Components/LandingPage/Index';
import Header from './Components/Header/Index';
import {useState, useEffect, createContext, useMemo} from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap'
import MainDashboard from './Components/Dashboard/Index';
import { LatAndLong, DailyData } from './Services/ServicesTypes';
import { AxiosError } from 'axios';
import LogIn from './Components/LogIn';
import { useRateLimiter } from './Services/RateLimiter';
import BigSpinner from './Components/BigSpinner';
import vectorImage from './Vector.png';




const App: React.FC = (): JSX.Element => {

  const [postcode, setPostcode] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [latAndLong, setLatAndLong] = useState<LatAndLong>({latitude: 0, longitude: 0});
  const [weatherData, setWeatherData] = useState<DailyData | undefined>();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const rateLimiter = useRateLimiter(1, 5000 );
  const [loading, setLoading] = useState<boolean>(false);

  const getGeoLocationData = async () => {  
      setLoading(true);
    try{
        const apiResponse = await getGeoLocation(postcode) as LatAndLong;
        setLatAndLong({
            latitude: apiResponse.latitude,
            longitude: apiResponse.longitude
          })   
        
          
      } catch(err){
          console.log(err);
      } 
    
  }
  
  useEffect(() => {
    if(latAndLong.latitude !== 0 && latAndLong.longitude !== 0 ){     
      getWeatherData()
    }   
  }, [latAndLong]);

  const getWeatherData = async () => {

    //custom rate limiter hook used here to stop client-side requests being made too frequently to the weather API. This is done as due to the fact that relatively large amounts of data are being called, if too many requests are made then the API will issue a 429 (too many calls) error and block usage for the day. 
    rateLimiter.enqueue(async () => {
      try{   
        const {latitude, longitude} = latAndLong;     
        const apiResponse: DailyData | unknown | AxiosError = await getHistoricalWeatherData(latitude, longitude);      
      
        //error handling
        if(apiResponse instanceof Error){        
            if(apiResponse instanceof AxiosError){
                console.error(`Error with the API call. This error has been given by the Axios request. ${apiResponse.message}`)
            } else{
                console.error(`Non-axios related error: ${apiResponse.message}`)
            }       
          }     
    
        setWeatherData(apiResponse as DailyData);   
        setFormSubmitted(true);

    } catch(err){
      console.log(err)
    } finally{
      setLoading(false);
    }
    }
    )
   
  }

  if(loading){
    return(
      <>
      <BigSpinner/>
      </>
    )
  }
 
  return (
    <>
   
      <Header
          postcode={postcode}
          place={place}
          formSubmitted={formSubmitted}
        />
          
  <div className='main-app '> 
    <Container className=''>
      <Row className='d-flex flex-row'>
        
      </Row>
     
      {weatherData ? 
      <MainDashboard
        weatherData={weatherData}      
      /> 
      : <Row className='row-main'>
      <div className=''>
       <LandingPage
          setPostcode={setPostcode}
          setPlace={setPlace}
          getGeoLocationData={getGeoLocationData}
        />
        </div> 
        </Row>
      }
      <Row>
          <Image
      src={vectorImage}
      />
      </Row>
    


      
       
     
      
    
    </Container>
  
  </div>
  </>
  );
}

export default App;

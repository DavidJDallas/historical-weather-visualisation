import React, { ReactNode } from 'react';
import { getGeoLocation, getHistoricalWeatherData } from './Services/APICalls';
import LandingPage from './Components/LandingPage/Index';
import Header from './Components/Header/Index';
import {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import MainDashboard from './Components/Dashboard/Index';
import { LatAndLong, DailyData } from './Services/ServicesTypes';
import { AxiosError } from 'axios';



const App: React.FC = (): JSX.Element => {

  const [postcode, setPostcode] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [latAndLong, setLatAndLong] = useState<LatAndLong>({latitude: 0, longitude: 0});
  const [weatherData, setWeatherData] = useState<DailyData | undefined>();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)

 const getGeoLocationData = async () => {  
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
    }
  }
  



  return (
  <div className='main-app '>
    <Container className=''>
      <Row className='d-flex flex-row'>
          <Header
            postcode={postcode}
            place={place}
            formSubmitted={formSubmitted}
          />
      </Row>
      <Row className='d-flex flex-row'>
      {weatherData ? 
      <MainDashboard
        weatherData={weatherData}      
      /> 
      :
       <LandingPage
          setPostcode={setPostcode}
          setPlace={setPlace}
          getGeoLocationData={getGeoLocationData}
        />
      }
       
      </Row>
      
    
    </Container>
  
  </div>
  );
}

export default App;

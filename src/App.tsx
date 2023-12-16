import React from 'react';
import { getGeoLocation, getHistoricalWeatherData } from './Services/APICalls';
import LandingPage from './Components/LandingPage/Index';
import Header from './Components/Header/Index';
import {useState, useEffect } from 'react';
import {Container, Row } from 'react-bootstrap'
import MainDashboard from './Components/Dashboard/Index';
import { LatAndLong, DailyData } from './Services/ServicesTypes';
import { AxiosError } from 'axios';
import { useRateLimiter } from './Services/RateLimiter';
import BigSpinner from './Components/BigSpinner';
import { SearchContext } from './Context/SearchContext';
import { useContext } from 'react';
import {SearchContextProps} from '../src/Context/ContextTypes'

const App: React.FC = (): JSX.Element => {

  //Import state from the context file
  const searchContext: SearchContextProps = useContext<SearchContextProps>(SearchContext);
  
  const {place, postcode, latAndLong, setLatAndLong, weatherData, setWeatherData} = searchContext;
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const rateLimiter = useRateLimiter(1, 5000 );
  const [loading, setLoading] = useState<boolean>(false);

  
  useEffect((): void => {
    if(latAndLong.latitude !== 0 && latAndLong.longitude !== 0 ){     
      getWeatherData()
    }   
  }, [latAndLong]);

  const getWeatherData = async (): Promise<void> => {

    //custom rate limiter hook used here to stop client-side requests being made too frequently to the weather API. This is done as due to the fact that relatively large amounts of data are being called, if too many requests are made then the API will issue a 429 (too many calls) error and block usage for the day. 
    rateLimiter.enqueue(async () => {
      try{  
        setLoading(true) 
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
      <Container      
        style={{margin: '200px'}}
      >
        <BigSpinner/>
       
      </Container>
      
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
     
     {/*The condition weatherData.rain_sum.length>3 is introduced because I've set the intial state of weatherData to be a an object of arrays with length of 3 of random data. This is to have this state having an initial value rather than be undefined, which was causing bugs when using d3 as it defines the type as DailyData | undefined, which d3 won't accept. This feels like a bit of a get-around, and I should address this in the future as it has ugly consequences like the below.  */}
      { formSubmitted && weatherData.rain_sum.length>1 ? 
      <MainDashboard
           
      /> 
      : <Row className='row-main'>
      <div className=''>
       <LandingPage         
          postcode={postcode}
          place={place}
          setLatAndLong={setLatAndLong}
          setLoading={setLoading}
         
        />
        </div> 
        </Row>
      }     
    
    </Container>
  
  </div>
  </>
  );
}

export default App;

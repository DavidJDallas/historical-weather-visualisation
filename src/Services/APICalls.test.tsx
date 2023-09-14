import axios, { AxiosError } from 'axios';
import '@testing-library/jest-dom'
import { getGeoLocationByPostcode, getHistoricalWeatherData } from './APICalls';
import * as React from 'react';

describe('getGeoLocationByPostcode', () => {
  
    jest.mock('axios');
  
    it("Sucessfully calls axios and return the correct response", async () => {  
      const mockData = {      
          data: {          
            features: [{          
              bbox: ['-80.577', '28.562', '28.562', '-80.577'],          
            }],              
        },         
      };

      const mockResponse =   
                  {
                    latitude: '28.562',
                    longitude: '-80.577',
                  }
              
  
      axios.get = jest
        .fn()
        .mockResolvedValue(mockData);
  
       const response = await getGeoLocationByPostcode('bn20 8dy');    
      
     expect(response).toEqual(mockResponse); 
      
  
    });

    it("Returns the appropriate error if there is an Axios error returned from the API", async () => {
      axios.get = jest
        .fn()
        .mockRejectedValue(new AxiosError('incorrect address'))
  
      const response = await getGeoLocationByPostcode('bn20 8dy');    

      expect(response).toBe('There was an error with the API call: AxiosError: incorrect address')  
    });

    it("Returns the appropriate error if there is a non-Axios error returned from the API", async () => {
      axios.get = jest
        .fn()
        .mockRejectedValue(new Error('incorrect address'));

      const response = await getGeoLocationByPostcode('bn20 8dy');

      expect(response).toBe('Non-axios related error: Error: incorrect address');    
  })
})

describe('getHistoricalWeatherData', () => {
  
  jest.mock('axios');

  it("Sucessfully calls axios and return the correct response", async () => {  
    const mockData = {      
        data: {          
               daily: [{
                rain_sum: [0,0,0.2],
                temperature_2m_max: [1,2,3],
                temperature_2m_min: [1,2,3],
                time: ['1989-01-01', '1989-01-02', '1989-01-03'],
                windspeed_10m_max: [1,2,3],
               }]     
      },         
    };

    const mockResponse =   
                [{
                  rain_sum: [0,0,0.2],
                  temperature_2m_max: [1,2,3],
                  temperature_2m_min: [1,2,3],
                  time: ['1989-01-01', '1989-01-02', '1989-01-03'],
                  windspeed_10m_max: [1,2,3],
                }]
            

    axios.get = jest
      .fn()
      .mockResolvedValue(mockData);

     const response = await getHistoricalWeatherData('28.562', '-80.577', 1989, 'celsius');    
    
   expect(response).toEqual(mockResponse); 
    

  });

  it("Returns the appropriate error if there is an Axios error returned from the API", async () => {
    axios.get = jest
      .fn()
      .mockRejectedValue(new AxiosError('incorrect address'))

      const response = await getHistoricalWeatherData('28.562', '-80.577', 1989, 'celsius');       

    expect(response).toBe('There was an error with the API call: AxiosError: incorrect address')  
  });

  it("Returns the appropriate error if there is a non-Axios error returned from the API", async () => {
    axios.get = jest
      .fn()
      .mockRejectedValue(new Error('incorrect address'));

      const response = await getHistoricalWeatherData('28.562', '-80.577', 1989, 'celsius');  

    expect(response).toBe('Non-axios related error: Error: incorrect address');    
})
})
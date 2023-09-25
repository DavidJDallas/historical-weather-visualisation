import axios, {AxiosError} from "axios";
import {  APICallGeoLocation, HistoricalWeatherDataType, DailyData, LatAndLong} from './ServicesTypes';

export const getGeoLocation = async (postcodeOrPlace: string): Promise <LatAndLong | unknown> => {
  
        try{
            console.log('called geolocation')
            const {data: {features}}: APICallGeoLocation = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${postcodeOrPlace}.json`, {
                params: {
                    //This is not a confidential key and so is fine to send and display like this.
                    access_token:'pk.eyJ1IjoiZGF2aWRkYWxsYXMiLCJhIjoiY2xkYmJ1bHZlMHJmejNwbW52eTRjM2VzZSJ9.rM_Hjd9qOm5TtFLPW3vPbQ'
                }
            })

            const latAndLong = {
                longitude: features[0].bbox[0],
                latitude: features[0].bbox[1]
            }
            return latAndLong

        } catch(error: unknown){
            if(error instanceof AxiosError){               
                return `There was an error with the API call: ${error}`
            } else {
                return `Non-axios related error: ${error}`
            }
    }}



export const getHistoricalWeatherData = async (latitude: number, longitude: number): Promise<DailyData | unknown | AxiosError> => {
    try{
        console.log('called main weatherapi')
        const {data: {daily: dailyData}}: HistoricalWeatherDataType= await axios.get(`https://archive-api.open-meteo.com/v1/archive`, {
            params: {
                latitude: latitude,
                longitude: longitude,
                timezone: 'GMT',
                start_date: `1941-01-01`,
                end_date: '2022-12-31',
                daily: ['temperature_2m_max', 'temperature_2m_min', 'rain_sum', 'windspeed_10m_max'],
                temperature_unit: 'celsius'
            }, 
            responseType: 'json'
        })
        

        return dailyData

    } catch(error: unknown){
        if(error instanceof AxiosError){               
            return `There was an error with the API call: ${error}`
        } else {
            return `Non-axios related error: ${error}`
        }
}}

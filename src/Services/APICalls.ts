import axios, {AxiosError} from "axios";
import {  APICallGeoLocation, HistoricalWeatherDataType, DailyData, LatAndLong} from './ServicesTypes';

export const getGeoLocation = async (postcodeOrPlace: string): Promise <LatAndLong | unknown> => {
  
        try{
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
       
        const {data: {daily: dailyData}}: HistoricalWeatherDataType= await axios.get(`https://archive-api.open-meteo.com/v1/archive`, {
            params: {
                latitude: latitude,
                longitude: longitude,
                timezone: 'GMT',
                start_date: `1942-01-01`,
                end_date: '2022-12-31',
                daily: ['temperature_2m_max', 'rain_sum'],
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


//The function below posts the data from the initial call onto the corresponding backend for this app. This is so the user can compare various locations historical data without invoking a 429 error on the open-meteo API. 
export const postHistoricalWeatherData = async(data: DailyData): Promise<void> => {
    try{
        const response = await axios.post(`http://localhost:3000/api/main`, {
            Rain: data.rain_sum,
            TemperatureMax: data.temperature_2m_max,
            Time: data.time
        });

        //sets the unique ID associated with this data on the backend in local storage so that it's more easily accessible later.
        localStorage.setItem('dataItem', response.data.id);  

        console.log(response);
    }
    catch(err){
        console.log(err)
    }
}

export const getWeatherDataFromBackend = async(data: DailyData): Promise<void> => {
    
}
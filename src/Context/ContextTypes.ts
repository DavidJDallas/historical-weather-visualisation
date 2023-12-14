import { DailyData, LatAndLong } from "../Services/ServicesTypes"

export interface SearchContextProps{
    place: string,
    setPlace: React.Dispatch<React.SetStateAction<string>>,
    postcode: string,
    setPostcode: React.Dispatch<React.SetStateAction<string>>,
    latAndLong: LatAndLong,
    setLatAndLong: React.Dispatch<React.SetStateAction<LatAndLong>>,
    weatherData: DailyData,
    setWeatherData: React.Dispatch<React.SetStateAction<DailyData>>
};
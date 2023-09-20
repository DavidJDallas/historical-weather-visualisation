import { DailyData } from "../../Services/ServicesTypes";

export interface MainDashboardProps{
    weatherData: DailyData;
};

export interface FormattedData{
    date: Date ,
    rain: number,
    temperatureMax: number,
    temperatureMin: number,
    windspeed: number
}

export type TwoDimArray = [number, FormattedData[]]


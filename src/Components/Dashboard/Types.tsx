import { DailyData } from "../../Services/ServicesTypes";

export interface MainDashboardProps{
    weatherData: DailyData;
};

export interface FormattedData{
    date: Date ,
    rain: number,
    temperatureMax: number,  
}

export type TwoDimArray = [number, FormattedData[]]

export interface GroupedDataByMonth{
    month: string,
    data: FormattedData[]

}

export interface GroupedDataByYear{
    year: number,
    data: FormattedData[]
}

export interface GroupedDataBySeason{
    season: string,
    data: FormattedData[]
}
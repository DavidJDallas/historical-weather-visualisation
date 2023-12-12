import { Dispatch, SetStateAction } from "react";
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

export interface GroupedData{
    month?: string,
    season?: string,
    data: FormattedData[]
}

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

export interface CheckFormProps{
    displayTempByMonthAverage: boolean,
    displayTempBySeasonAverage: boolean,
    setDisplayTempByMonthAverage: (data: boolean) => void,
    setDisplayTempBySeasonAverage: (data: boolean) => void,
    displayTempByYearAverage: boolean,
    setDisplayTempByYearAverage: (data: boolean) => void,
}

//NavBar

export interface NavBarProps{
    weatherTypeSelected: boolean,
    setWeatherTypeSelected: (data: boolean) => void
}


//Range Slider

export interface RangeSliderProps{
    yearValue: number,
    setYearValue: Dispatch<SetStateAction<number>>
}


// SaveChartData

export interface SaveChartDataProps{
    weatherData: DailyData
}
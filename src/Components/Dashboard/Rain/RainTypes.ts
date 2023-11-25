import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { GroupedDataByMonth, GroupedDataByYear, GroupedDataBySeason, FormattedData } from "../Types";


export interface IndexProps{
    dataBySeason: GroupedDataBySeason[] | [],
    formattedData: FormattedData[] | []
    dataByMonth: GroupedDataByMonth[] | [],
    dataByYear: GroupedDataByYear[] | []
}

export interface CheckFormRainProps{
    displayRainByMonthAverage: boolean,
    displayRainBySeasonAverage: boolean,
    displayRainByYearAverage: boolean,
    setDisplayRainByMonthAverage: (data: boolean) => void;
    setDisplayRainBySeasonAverage: (data: boolean) => void;
    setDisplayRainByYearAverage: (data: boolean) => void;
}

export interface RangeSliderRainProps{
    yearValue: number, 
    setYearValue: Dispatch<SetStateAction<number>>
}

export interface RainByMonthProps{
    dataByMonth: GroupedDataByMonth[],
    width: number,
    height: number,
    yearValue: number,
}

//Rain By Month

export interface RainDataMonth{
    month: string,
    rain: number | any
}

export interface CheckFormAverageOrTotalProps{
    averageOrTotal: string,
    setAverageOrTotal: (data: any) => void
}

//Rain By Season

export interface RainDataSeasonProps{
    dataBySeason: GroupedDataBySeason[],
    width: number,
    height: number,
    yearValue: number,
}

export interface RainDataSeason{
    season: string,
    rain: number | any
}

//Rain By Year

export interface RainDataYearProps{
    yearValue: number,
    width: number,
    height: number,
    dataByYear: GroupedDataByYear[]
}

export interface RainDataYear{
    year: number,
    [variable: string]: number
}
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

//wetvsdry

export interface WetVsDryMonthProps{
    yearValue: number,
    width: number,
    height: number,
    dataByMonth: GroupedDataByMonth[],
}

export interface WetVsDryMonthObject{
    month: string,
    wetDays: number,
    dryDays: number,
    total: number
}

export interface WetVsDrySeasonProps{
    yearValue: number,
    width: number,
    height: number,
    dataBySeason: GroupedDataBySeason[]
}

export interface WetVsDrySeasonObject{
    season: string,
    wetDays: number,
    dryDays: number,
}

export type stackedData = d3.Series<{ [key: string]: string | number }, string >
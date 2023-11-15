import { GroupedDataByMonth, GroupedDataByYear, GroupedDataBySeason, FormattedData } from "../Types";

export interface TemperatureProps {
    dataBySeason: GroupedDataBySeason[] | [],
    formattedData: FormattedData[] | []
    dataByMonth: GroupedDataByMonth[] | [],
    dataByYear: GroupedDataByYear[] | []
}

export interface RangeSliderProps {
    yearValue: number,
    setYearValue: (value: number) => void
}

export interface FilteredDataByMonth{
    month: string,
    data: FormattedData[]
}



//TempByMonth
export interface TempByMonthProps{
    dataByMonth: GroupedDataByMonth[],
    width: number,
    height: number,
    yearValue: number
}

export interface TempDataMonth{
    month: string,
    temperature: number | any
}


//TempBySeason
export interface TempDataSeason{
    season: string,
    temperature: number | any
}

export interface TempBySeasonProps{
    dataBySeason: GroupedDataBySeason[],
    width: number,
    height: number,
    yearValue: number
}

export interface FilteredDataBySeason{
    season: string,
    data: FormattedData[]
}

/* Data By Year */

export interface TempByYearProps{
    width: number,
    height: number,
    dataByYear: GroupedDataByYear[],
    yearValue: number
}

export interface TempDataYear{
    year: number,
    [variable: string]: number
}
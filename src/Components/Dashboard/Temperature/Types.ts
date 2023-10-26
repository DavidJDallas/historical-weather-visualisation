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

export interface TempByMonthProps{
    dataByMonth: GroupedDataByMonth[],
    width: number,
    height: number,
    yearValue: number
}

export interface FilteredDataByYear{
    month: string,
    data: FormattedData[]
}

export interface TempData{
    month: string,
    temperature: number | any
}

export interface TempBySeasonProps{
    dataBySeason: GroupedDataBySeason[],
    width: number,
    height: number,
    yearValue: number
}
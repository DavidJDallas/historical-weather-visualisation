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
    setYearValue: (data: any) => void
}
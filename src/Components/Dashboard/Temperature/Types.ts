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
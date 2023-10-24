import { GroupedDataByMonth, GroupedDataByYear, GroupedDataBySeason, FormattedData } from "../Types";

export interface TemperatureProps {
    groupDataBySeason: (data: FormattedData[]) => void,
    groupDataByYear: (data: FormattedData[]) => GroupedDataByYear[],
    groupDataByMonth: (data: FormattedData[]) => GroupedDataByMonth[],
    formattedData: FormattedData[] | []
}


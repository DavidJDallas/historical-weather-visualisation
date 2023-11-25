import * as d3 from 'd3';
import { FormattedData, GroupedDataByYear } from '../Components/Dashboard/Types';

export const calculateMeanByYear = (dataByYear: GroupedDataByYear[], yearValue: number, variable: string) => {
    
    const filteredDataByYear = dataByYear.filter((year: GroupedDataByYear) => year.year >= yearValue);
    return filteredDataByYear.map((year) => ({

        year: year.year,
        [variable]: variable === 'temperature' ? 
        (d3.mean(year.data.map((element: FormattedData) => Number(element.temperatureMax))) as number) ?? 0 
        : 
        (d3.mean(year.data.map((element: FormattedData) => Number(element.rain)))as number)
        ?? 0

    }))
}
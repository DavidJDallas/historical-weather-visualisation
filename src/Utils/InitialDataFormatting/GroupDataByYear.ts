import * as d3 from 'd3';
import { FormattedData, GroupedDataByYear } from '../../Components/Dashboard/Types';

export const groupDataByYear =(data:FormattedData[]): GroupedDataByYear[] => {
    const dataGroupedByYear: GroupedDataByYear[] = Array
                                        .from(d3.group(data, (d) => d.date.getFullYear()))
                                        .map((element, i) => ({
                                                year: element[0],
                                                data: element[1]
                                            }))
    return dataGroupedByYear
}
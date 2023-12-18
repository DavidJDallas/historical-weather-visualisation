import * as d3 from 'd3';
import { FormattedData, GroupedDataByMonth, GroupedDataBySeason } from '../../Components/Dashboard/Types';

type GroupByMonthFunc = (data: FormattedData[]) => GroupedDataByMonth[]

export const groupDataBySeason = (data: FormattedData[], groupByMonthFunc: GroupByMonthFunc): GroupedDataBySeason[] => {

    /**
 * Groups data by season using a provided grouping function.
 * @param data - The input data to be grouped.
 * @param groupByMonthFunc - The function to group data by month.
 * @returns An array of objects representing grouped data by season.
 */

    //1. Group by Month
    const groupedByMonth = groupByMonthFunc(data);

    //2. Translate months to seasons
    const seasonTranslator = {
        January: 'Winter',
        February: 'Winter',
        March: 'Spring',
        April: 'Spring',
        May: 'Spring',
        June: 'Summer',
        July: 'Summer',
        August: 'Summer',
        September: 'Autumn',
        October: 'Autumn',
        November: 'Autumn',
        December: 'Winter'
    }

    const replaceMonthsWithSeasons = groupedByMonth.map((element: GroupedDataByMonth) => {
                const seasonIndex = element.month as keyof typeof seasonTranslator;            
                    return{
                        season: seasonTranslator[seasonIndex],
                        data: element.data
                    }
                    
    })

    //3. Group by Seasons
    const groupedBySeason = Array
            .from(d3.group(replaceMonthsWithSeasons, d=> d.season))
            .map((season) => {
                return{
                    season: season[0],
                    data: season[1].flatMap(element => element.data)
                }
            })
    
    return groupedBySeason

}
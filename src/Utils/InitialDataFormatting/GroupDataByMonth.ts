import * as d3 from 'd3';
import { FormattedData, GroupedDataByMonth } from '../../Components/Dashboard/Types';
import { TwoDimArray } from '../../Components/Dashboard/Types';

export const groupDataByMonth = (data: FormattedData[]): GroupedDataByMonth[] =>{
    let numberToMonthTranslator = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

const dataGroupedByMonth: GroupedDataByMonth[] = Array
                        .from(d3.group(data, (d) => d.date.getMonth()))
                        .map((element: TwoDimArray) => {
                           
                            const monthIndex = element[0] as keyof typeof numberToMonthTranslator;                              
                            return {                 
                                month: numberToMonthTranslator[monthIndex],
                                data: element[1],
                                  
                            }}
                        )

    return dataGroupedByMonth;  
} 
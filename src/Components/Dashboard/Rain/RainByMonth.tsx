import React from 'react';
import * as d3 from 'd3';
import { RainByMonthProps, RainDataMonth } from './RainTypes';
import { useEffect, useState } from 'react';
import { FilteredDataByMonth} from '../Temperature/Types';
import { filterDataByYear } from '../../../Utils/FilterDataByYear';
import BarChartTemplate from '../../../Graphs/BarChart';
import { FormattedData } from '../Types';

const RainByMonth = ({dataByMonth, width, height, yearValue }: RainByMonthProps): JSX.Element => {

    const [rainData, setRainData] = useState<[] | RainDataMonth[]>([]);
   

    useEffect(() => {
        const filteredDataByYear: FilteredDataByMonth[] = filterDataByYear(dataByMonth, yearValue);

       const calculateMean: RainDataMonth[] = filteredDataByYear.map((object) => ({
               month: object.month,
               rain: d3.mean((object.data.map((element: FormattedData) => element.rain)))
            
           }))
       setRainData(calculateMean);
   }, [dataByMonth, yearValue]);

    return(
        <>
        <BarChartTemplate
            data={rainData}
            width={width}
            height={height}
            yearValue={yearValue}
            title={'Average Rainfall by Day Per Month(mm)'}
            interpolateFirstColour={'#77ccff'}
            interpolateSecondColour={'#0066ff'}
            xAccessor={'month'}
            yAccessor={'rain'}
            domainFirstValueX={0}
            domainFirstValueY={0}
            sliceLength={3}
            gapBetweenBars={2}
            unit={'mm'}
        />
       
        </>
    )

}

export default RainByMonth
import React from 'react';
import * as d3 from 'd3';
import { RainDataSeasonProps, RainDataSeason } from './RainTypes';
import { useEffect, useState } from 'react';
import { FilteredDataBySeason } from '../Temperature/Types';
import { filterDataByYear } from '../../../Utils/FilterDataByYear';
import { FormattedData } from '../Types';
import BarChartTemplate from '../../../Graphs/BarChart';

const RainBySeason = ({dataBySeason, width, height, yearValue}: RainDataSeasonProps): JSX.Element => {

    const [rainData, setRainData] = useState<[] | RainDataSeason[]>([]);

    useEffect(() => {
        const filteredDataBySeason: FilteredDataBySeason[] = filterDataByYear(dataBySeason, yearValue);
        
       const calculateMean: RainDataSeason[] = filteredDataBySeason.map((object) => ({
               season: object.season,
             rain: d3.mean((object.data.map((element: FormattedData) => element.rain)))
           }))
       setRainData(calculateMean);
   }, [dataBySeason, yearValue]);

    return(
        <>
        <BarChartTemplate
            data={rainData}
            width={width}
            height={height}
            yearValue={yearValue}
            title={'Average Rainfall by Day Per Month(mm)'}
            interpolateFirstColour={'rgba(45,85,255,0.1'}
            interpolateSecondColour={'rgba(45,85,255,1)'}
            xAccessor={'season'}
            yAccessor={'rain'}
            domainFirstValueX={0}
            domainFirstValueY={0}
            sliceLength={6}
            gapBetweenBars={6}
            unit={'mm'}
        />

        </>
    )

}

export default RainBySeason
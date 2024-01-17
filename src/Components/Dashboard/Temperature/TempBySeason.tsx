import React from 'react';
import * as d3 from 'd3';
import { TempBySeasonProps, FilteredDataBySeason, TempDataSeason } from './Types';
import {useState, useEffect, useRef} from 'react';
import { filterDataByYear } from '../../../Utils/FilterDataByYear';
import { FormattedData } from '../Types';
import BarChartTemplate from '../../../Graphs/BarChart';

const TempBySeason = ({dataBySeason, width, height, yearValue}: TempBySeasonProps): JSX.Element => {

    const [tempData, setTempData] = useState<TempDataSeason[] | []>([]);

    useEffect(() => {
        const filteredDataBySeason: FilteredDataBySeason[] = filterDataByYear(dataBySeason, yearValue);
        
       const calculateMean: TempDataSeason[] = filteredDataBySeason.map((object) => ({
               season: object.season,
               temperature: d3.mean((object.data.map((element: FormattedData) => element.temperatureMax)))
           }));
       setTempData(calculateMean);
   }, [dataBySeason, yearValue]);

    return(
        <>
        <BarChartTemplate
              data={tempData}
              width={width}
              height={height}
              yearValue={yearValue}
              title={'Average Temperature Per Month (degrees c)'}
              interpolateFirstColour={'blue'}
              interpolateSecondColour={'red'}
              xAccessor={'season'}
              yAccessor={'temperature'}
              domainFirstValueX={0}
              domainFirstValueY={0}
              sliceLength={8}
              gapBetweenBars={3}
              unit={'°c'}
        />
        </>
    )
}

export default TempBySeason;
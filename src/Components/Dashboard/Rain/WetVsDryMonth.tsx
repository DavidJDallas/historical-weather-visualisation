import * as React from 'react';
import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import { WetVsDryMonthObject, WetVsDryMonthProps } from './RainTypes';
import { FilteredDataByMonth } from '../Temperature/Types';
import { filterDataByYear } from '../../../Utils/FilterDataByYear';
import StackedBarChartTemplate from '../../../Graphs/StackedBarChart';

const WetVsDryMonth = ({yearValue, width, dataByMonth, height}: WetVsDryMonthProps) => {

    const [rainData, setRainData] = useState<WetVsDryMonthObject[] | []>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const filteredDataByYear: FilteredDataByMonth[] = filterDataByYear(dataByMonth, yearValue);
        
        const calculateWetAndDryDays: WetVsDryMonthObject[] = filteredDataByYear.map((object) => {
            const wetDays = object.data.filter((element) => element.rain > 0).length;
            const dryDays = object.data.filter((element) => element.rain ===0).length;
             return {
                month: object.month,
                wetDays,
                dryDays,
                total: wetDays+dryDays
            }               
               
           })
       setRainData(calculateWetAndDryDays);
   }, [dataByMonth, yearValue]);

console.log(rainData)
    return(
        <>
        <StackedBarChartTemplate
        data={rainData}
        width = {width}
        height ={height}
        yearValue={yearValue}
        title = {'Wet Vs Dry Months'}
        xAccessor={'month'}
        yAccessor={'rain'}
        domainFirstValueX = {0}
        domainFirstValueY={0}
        sliceLength={3}
        gapBetweenBars={2}
        
        />
        </>
    )
}

export default WetVsDryMonth;
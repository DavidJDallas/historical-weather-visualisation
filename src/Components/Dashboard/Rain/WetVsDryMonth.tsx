import * as React from 'react';
import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import { WetVsDryMonthObject, WetVsDryMonthProps, stackedData } from './RainTypes';
import { FilteredDataByMonth } from '../Temperature/Types';
import { filterDataByYear } from '../../../Utils/FilterDataByYear';
import StackedBarChartTemplate from '../../../Graphs/StackedBarChart';

const WetVsDryMonth = ({yearValue, width, dataByMonth, height}: WetVsDryMonthProps) => {

    const [rainData, setRainData] = useState<stackedData[] | []>([]);

    const chartRef = useRef<SVGSVGElement | null>(null);

    //The useEffect below transforms the data into a suitable format for the stacked bar chart to work with.

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

           const series: (keyof WetVsDryMonthObject)[] = ["wetDays", "dryDays"];
           const transposedData: { [key: string]: string | number }[] = calculateWetAndDryDays.map((d) => {
               const transposedEntry: { [key: string]: string | number } = { x: d.month };
               series.forEach((s) => (transposedEntry[s] = d[s]));
               return transposedEntry;
           });

           const stackedData = d3.stack<{ [key: string]: string | number }>().keys(series)(transposedData);

    
       setRainData(stackedData);
   }, [dataByMonth, yearValue]);

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
import * as React from 'react';
import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import { WetVsDryMonthObject, WetVsDryMonthProps } from './RainTypes';
import { FilteredDataByMonth } from '../Temperature/Types';
import { filterDataByYear } from '../../../Utils/FilterDataByYear';

const WetVsDryMonth = ({yearValue, width, dataByMonth, height}: WetVsDryMonthProps) => {

    const [rainData, setRainData] = useState<WetVsDryMonthObject[] | []>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const filteredDataByYear: FilteredDataByMonth[] = filterDataByYear(dataByMonth, yearValue);
        
        const calculateWetAndDryDays: WetVsDryMonthObject[] = filteredDataByYear.map((object) => ({
               month: object.month,
               wetDays: object.data.filter((element) => element.rain > 0).length,
               dryDays: object.data.filter((element)=> element.rain === 0).length,
           }))
       setRainData(calculateWetAndDryDays);
   }, [dataByMonth, yearValue]);


    return(
        <>
        </>
    )
}

export default WetVsDryMonth;
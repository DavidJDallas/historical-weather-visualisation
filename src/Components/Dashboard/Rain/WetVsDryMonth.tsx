import * as React from 'react';
import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import { WetVsDryMonthProps } from './RainTypes';
import { RainDataMonth } from './RainTypes';
import { FilteredDataByMonth } from '../Temperature/Types';
import { filterDataByYear } from '../../../Utils/FilterDataByYear';
import { FormattedData } from '../Types';


const WetVsDryMonth = ({yearValue, width, dataByMonth, height}: WetVsDryMonthProps) => {

    const [rainData, setRainData] = useState<any[]>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const filteredDataByYear: FilteredDataByMonth[] = filterDataByYear(dataByMonth, yearValue);

        console.log(filteredDataByYear)
       const calculateWetAndDryDays = filteredDataByYear.map((object) => ({
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
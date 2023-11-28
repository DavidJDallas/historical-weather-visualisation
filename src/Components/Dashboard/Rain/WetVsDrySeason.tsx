import * as React from 'react';
import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import { WetVsDrySeasonObject, WetVsDrySeasonProps } from './RainTypes';
import { FilteredDataByMonth } from '../Temperature/Types';
import { filterDataByYear } from '../../../Utils/FilterDataByYear';

const WetVsDryMonth = ({yearValue, width, dataBySeason, height}: WetVsDrySeasonProps) => {

    const [rainData, setRainData] = useState<WetVsDrySeasonObject[] | []>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const filteredDataByYear: FilteredDataByMonth[] = filterDataByYear(dataBySeason, yearValue);
        
        const calculateWetAndDryDays: WetVsDrySeasonObject[] = filteredDataByYear.map((object) => ({
               season: object.month,
               wetDays: object.data.filter((element) => element.rain > 0).length,
               dryDays: object.data.filter((element)=> element.rain === 0).length,
           }))
       setRainData(calculateWetAndDryDays);
   }, [dataBySeason, yearValue]);


    return(
        <>
        </>
    )
}

export default WetVsDryMonth;
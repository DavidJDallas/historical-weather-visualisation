import React from 'react';
import * as d3 from 'd3';
import { RainByMonthProps, RainDataMonth } from './RainTypes';
import { useEffect, useState, useRef } from 'react';
import { FilteredDataByYear } from '../Temperature/Types';

const RainByMonth = ({dataByMonth, width, height, yearValue}: RainByMonthProps) => {

    const [rainData, setRainData] = useState<[] | RainDataMonth[]>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const filteredDataByYear: FilteredDataByYear[] = dataByMonth.map((month) => {
           return {
               ...month,
               data: month.data.filter((day) => {
                   let dateObj = new Date(day.date);
                   let year = dateObj.getFullYear();
                   return year >= yearValue;
               })
           };
       })
       console.log(filteredDataByYear)
       const calculateMean = filteredDataByYear.map((object) => ({
               month: object.month,
           rain: d3.mean((object.data.map((element) => element.temperatureMax)))
           }))
       setRainData(calculateMean);
   }, [dataByMonth, yearValue]);


    return(<>
    </>)

}

export default RainByMonth
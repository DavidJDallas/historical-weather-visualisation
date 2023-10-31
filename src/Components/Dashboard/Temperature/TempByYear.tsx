import { TempByYearProps, TempDataYear } from "./Types";
import {useEffect, useState, useRef} from 'react';
import * as d3 from 'd3';

const TempByYear = ({dataByYear, width, height, yearValue}: TempByYearProps) => {

    console.log(dataByYear);

    const [tempData, setTempData] = useState<[] | TempDataYear[]>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);
    
    useEffect(() => {

        const filteredDataByYear = dataByYear.filter(year => year.year >= yearValue)
        const calculateMeanByYear = filteredDataByYear.map((year) => ({
            year: year.year,
            temperature: d3.mean(year.data.map(element => element.temperatureMax))
        }))
        console.log(filteredDataByYear)
        console.log(calculateMeanByYear)
        

        setTempData(calculateMeanByYear);
    }, [dataByYear, yearValue])

    useEffect(() => {

        d3.select(chartRef.current).selectAll('*').remove();

        let adjustedWidth = width -30;

        const xScale = d3.scaleLinear()
                            .domain([0, tempData.length])
                            .range([0, d3.max(tempData.map((element) => element.temperature))])
    
        const yScale = d3.scaleLinear()
                            .domain([0, d3.max(tempData.map((element) => element.temperature))])
                            .range([height, 50]);

        const xAxis = d3.scaleBand()
                        .domain(tempData.map(x => String(x.year)))
                        .range([height])


    }, [])



    return(
        <>
            <h1> Temp by year</h1>
        </>
    )

}

export default TempByYear
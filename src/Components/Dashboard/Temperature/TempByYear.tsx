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

    }, [])



    return(
        <>
            <h1> Temp by year</h1>
        </>
    )

}

export default TempByYear
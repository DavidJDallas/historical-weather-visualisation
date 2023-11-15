import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import { RainDataYear, RainDataYearProps } from './RainTypes';
import { GroupedDataByYear } from '../Types';
import * as d3 from 'd3';
import { calculateMeanByYear } from '../../../Utils/CalculateMeanByYear';


const RainByYear = ({yearValue, width, height, dataByYear}: RainDataYearProps) => {

    const [rainData, setRainData] = useState<RainDataYear[]>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const meanByYear= calculateMeanByYear(dataByYear, yearValue, 'rain');
        setRainData(meanByYear);

    }, [dataByYear, yearValue])


    return(
        <>
        
        </>
    )
}

export default RainByYear
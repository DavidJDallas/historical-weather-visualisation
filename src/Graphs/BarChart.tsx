import * as React from 'react';
import * as d3 from 'd3';
import {useState, useEffect, useRef} from 'react';
import { interpolateViridis } from 'd3';
import { BarChartProps } from './GraphTypes';

const BarChartTemplate = ({
  data, width, height, xAccessor, yAccessor, yearValue, title, interpolateFirstColour, interpolateSecondColour
}: BarChartProps) => {

    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
    if(data.length>0){
        d3.select(chartRef.current).selectAll('*').remove();
    
        //const colourScale = d3.scaleSequential()
        //.domain([0, d3.max(data.map((element) => element[yAccessor]))])
        
    
    
    
    }
    }, [])

    return(<>
     {/* <svg className=''ref={chartRef} height={'100%'} width={'100%'} preserveAspectRatio='xMinYMin meet' ></svg> */}
    </>)


}

export default BarChartTemplate
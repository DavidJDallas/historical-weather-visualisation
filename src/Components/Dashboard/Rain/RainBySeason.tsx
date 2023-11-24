import React from 'react';
import * as d3 from 'd3';
import { RainDataSeasonProps, RainDataSeason } from './RainTypes';
import { useEffect, useState, useRef } from 'react';
import { FilteredDataBySeason } from '../Temperature/Types';
import { filterDataByYear } from '../../../Utils/FilterDataByYear';

const RainBySeason = ({dataBySeason, width, height, yearValue, averageOrTotal}: RainDataSeasonProps) => {

    const [rainData, setRainData] = useState<[] | RainDataSeason[]>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const filteredDataBySeason: FilteredDataBySeason[] = filterDataByYear(dataBySeason, yearValue);
        
       const calculateMean = filteredDataBySeason.map((object) => ({
               season: object.season,
             rain: d3.mean((object.data.map((element: any) => element.rain)))
           }))
       setRainData(calculateMean);
   }, [dataBySeason, yearValue]);

   useEffect((): void => {  
        
            

    if(rainData.length>0){  
        d3.select(chartRef.current).selectAll('*').remove();
        
    let adjustedWidth = width-30
    
    const colourScale = d3.scaleSequential()
                        .domain([0, d3.max(rainData.map((element) => element.rain))])

    const interpolatorColourFunction = d3.interpolateRgb('rgba(45,85,255,0.1', 'rgba(45,85,255,1)')

    const xScale = d3.scaleLinear()
                        .domain([0, rainData.length])
                        .range([30, adjustedWidth]);

    const yScale = d3.scaleLinear()                             
                            .domain([0, d3.max(rainData.map((element) => element.rain *1.2) as number[]) ?? 0])
                            .range([height, 75]);

    const xAxis = d3.scaleBand()
                        .domain(rainData.map((x) => x.season.slice(0,8)))
                        .range([30, adjustedWidth])
                        .padding(0);

    const yAxis = d3.axisLeft(yScale)
                    .tickFormat(d => d.toString().slice(0,3));       

    const svg= d3.select(chartRef.current)
                        .append('svg')
                        .attr('width', width)
                        .attr('height', height+200);

    //Below removes all tooltips before implementing new ones to avoid tooltips lagging. The d3.selectAll().remove() doesn't cover tooltips since tooltips are added to the body. 
    //d3.selectAll('.tempMonthToolTip').remove();

    const tooltip = d3.select('body').append('div')
                        .attr('class', 'tempMonthToolTip')
                        //styles added in css file
                        

    svg.selectAll('rect')
                .data(rainData)
                .enter()
                .append('rect')
                .attr('x', (d,i) => xScale(i)+1)
                .attr('y', d => yScale(d.rain))
                .attr('width', xScale(5)-xScale(4) -20)
                .attr('height', d => height - yScale(d.rain))
                .attr('fill', d=> interpolatorColourFunction(colourScale(d.rain)))                        
                .on('mouseover', (event, d) => {
                    tooltip.html(`${(d.season)}: ${String(d.rain).slice(0,4)} `+ 'mm')
                        .style('visibility', 'visible')
                })
            .on('mousemove', (event) => {
                    tooltip.style('top', event.pageY - 10 + 'px')
                    tooltip.style('left', event.pageX + 10 + 'px')
                })
            .on('mouseout', () => {
                    tooltip.style('visibility', 'hidden')
                });
                
         svg.append('text')
               .attr('x', width/2)
               .attr('y', 30)
               .style('text-anchor', 'middle')
               .style('font-size', '18px')
               .text(`Average Rainfall per day By Season(mm)`);
        
        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xAxis))
            .selectAll('text')
            .style('font-size', '13px')
                    
        svg.append('g') 
            .attr('transform', `translate(30,0)`)              
            .call(yAxis)
            .selectAll('text')
            .style('font-size', '9px')    
            
    }




}, [rainData, height, width]);


    return(
        <>
        <svg className=''ref={chartRef} height={'100%'} width={'100%'} preserveAspectRatio='xMinYMin meet' ></svg>
        </>
    )

}

export default RainBySeason
import React from 'react';
import * as d3 from 'd3';
import { TempBySeasonProps, FilteredDataBySeason, TempDataSeason } from './Types';
import {useState, useEffect, useRef} from 'react';


const TempBySeason = ({dataBySeason, width, height, yearValue}: TempBySeasonProps) => {

    const [tempData, setTempData] = useState<TempDataSeason[] | []>([])
    const chartRef = useRef<SVGSVGElement | null>(null);


    useEffect(() => {
        const filteredDataBySeason: FilteredDataBySeason[] = dataBySeason.map((season) => {
            return {
               ...season,
               data: season.data.filter((day) => {
                   let dateObj = new Date(day.date);
                   let year = dateObj.getFullYear();
                   return year >= yearValue;
               })
           };
       })
       const calculateMean = filteredDataBySeason.map((object) => ({
               season: object.season,
               temperature: d3.mean((object.data.map((element) => element.temperatureMax)))
           }))
       setTempData(calculateMean);
   }, [dataBySeason, yearValue]);



   useEffect((): void => {                 

    if(tempData.length>0){  

        d3.select(chartRef.current).selectAll('*').remove();
        
        let adjustedWidth = width-30
        
        const xScale = d3.scaleLinear()
                            .domain([0, tempData.length])
                            .range([30, adjustedWidth]);

        const yScale = d3.scaleLinear()
                        .domain([d3.min(tempData.map((element) => element.temperature /1.2) as number[]) ?? 0, d3.max(tempData.map((element) => element.temperature *1.2) as number[]) ?? 0])
                            .range([height, 50]);

        const xAxis = d3.scaleBand()
                            .domain(tempData.map((x) => x.season))
                            .range([30, adjustedWidth])
                            .padding(0);

        const yAxis = d3.axisLeft(yScale)
                        .tickFormat(d => d.toString().slice(0,5))

        const colourScale = d3.scaleSequential()
                        .domain([0, d3.max(tempData.map((element) => element.temperature))])

        const interpolatorColourFunction = d3.interpolateRgb('blue', 'red')


        const svg= d3.select(chartRef.current)
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height+200);

        d3.selectAll('.tempMonthToolTip').remove();
        
        const tooltip = d3.select('body').append('div')
                            .style('position', 'absolute')
                            .style('z-index', '10')
                            .style('visibility', 'hidden')
                            .style('background-color', 'white')
                            .style('border-style', 'solid')
                            .style('border-width', '2px')
                            .style('border-color', '#50e991')
                            .style('padding', '5px')
                            .style('font-size', '12px');

        svg.selectAll('rect')
                .data(tempData)
                .enter()
                .append('rect')
                .attr('x', (d,i) => xScale(i))
                .attr('y', d => yScale(d.temperature))
                .attr('width', xScale(5)-xScale(4) -20)
                .attr('height', (d, i) => (height-yScale(d.temperature) ))
                .attr('fill', d=> interpolatorColourFunction(colourScale(d.temperature)))                        
                .on('mouseover', (event, d) => {
                        tooltip.html(`${(d.season)}: ${String(d.temperature).slice(0,6)} `+ '&deg c')
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
               .text(`Average temperature by Season ()`);

        svg.append('g')
                .attr('transform', `translate(0, ${height})`)                
                .call(d3.axisBottom(xAxis))
                .selectAll('text')
                .style('font-size', '13px')
        
        svg.append('g')
            .attr('transform', 'translate(30,0)')
            .call(yAxis)
            .selectAll('text')
            .style('font-size', '9px')

    }

}, [tempData, height, width]);


    return(
        <>
               <svg className=''ref={chartRef} height={'100%'} width={'100%'} preserveAspectRatio='xMinYMin meet' ></svg>
        </>
    )

}

export default TempBySeason
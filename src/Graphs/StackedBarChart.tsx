import * as React from 'react';
import * as d3 from 'd3';
import {useEffect, useRef} from 'react';
import { StackedBarChartProps } from './GraphTypes';

const StackedBarChartTemplate = ({
  data, width, height, xAccessor, yAccessor, yearValue, title, domainFirstValueX, domainFirstValueY, sliceLength, gapBetweenBars
}: StackedBarChartProps): JSX.Element => {

    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
    if(data.length>0){
        d3.select(chartRef.current).selectAll('*').remove();

        
    
        const colourScale = d3.scaleSequential()
        .domain([0, d3.max(data.map((element) => element[yAccessor]))])

   

        const colourScheme = d3.scaleOrdinal(d3.schemeCategory10);

        const xScale = d3.scaleLinear()
                        .domain([domainFirstValueX, data.length])
                        .range([30, width-30]);
                        
        const yScale = d3.scaleLinear()
                          .domain([domainFirstValueY, d3.max(data.map((element) => element[yAccessor] *1.2) as number[] ?? 0)])
                          .range([height, 75])

        const xAxis = d3.scaleBand()
                    .domain(data.map(x => x[xAccessor]))
                    .range([30, width-30])
                    .padding(0);

        const yAxis = d3.axisLeft(yScale)
                      .tickFormat(d => d.toString().slice(0,3));

       
        const svg= d3.select(chartRef.current)
                      .append('svg')
                      .attr('width', width)
                      .attr('height', height+200);
          
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
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i)+1)
        .attr('y', d=> yScale(d[yAccessor]))
        .attr('width', xScale(5)-xScale(4) -gapBetweenBars)
        .attr('height', d=> height-yScale(d[yAccessor]))
        .attr('fill', d=> colourScale(d[yAccessor]))
        .on('mouseover', (event, d) => {
          tooltip.html(`${(d[xAccessor])}: ${String(d[yAccessor]).slice(0,4)} `+ 'mm')
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
      .text(title);

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
    }, [data, height, width, domainFirstValueX, domainFirstValueY, title, xAccessor, yAccessor]);

    return(<>
     <svg className=''ref={chartRef} height={'100%'} width={'100%'} preserveAspectRatio='xMinYMin meet' ></svg>
    </>)


}

export default StackedBarChartTemplate
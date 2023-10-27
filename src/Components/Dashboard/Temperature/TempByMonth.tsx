import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3'
import {interpolateViridis} from 'd3-scale-chromatic'
import {scaleSequential} from 'd3-scale'
import { FilteredDataByYear, TempByMonthProps, TempDataMonth } from './Types';


const TempByMonth = ({dataByMonth, width, height, yearValue}: TempByMonthProps) => {

    const [tempData, setTempData] = useState<[] | TempDataMonth[]>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);

    //useMemo is a React Hook that lets you cache the result of a calculation between re-renders. It looks at the dependency array and sees if anything has changed. If it has changed, it will re-run it. If not, it won't.
    console.log('TempByMonth rendered')

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
        const calculateMean = filteredDataByYear.map((object) => ({
                month: object.month,
                temperature: d3.mean((object.data.map((element) => element.temperatureMax)))
            }))
        setTempData(calculateMean);
    }, [dataByMonth, yearValue]);

   

    useEffect((): void => {                 

        if(tempData.length>0){  
            d3.select(chartRef.current).selectAll('*').remove();
            
        let adjustedHeight = height-25
        let adjustedWidth = width-30
        
        const colourScale = d3.scaleSequential()
                            .domain([0, d3.max(tempData.map((element) => element.temperature))])

        const interpolatorColourFunction = d3.interpolateRgb('blue', 'red')
  
        const xScale = d3.scaleLinear()
                            .domain([0, tempData.length])
                            .range([30, adjustedWidth]);

        const yScale = d3.scaleLinear()
                            .domain(
                                [(d3.min(tempData.map((element) => element.temperature))) -2, 
                                d3.max(tempData.map((element) => element.temperature))])
                            .range([height, 75]);

        const xAxis = d3.scaleBand()
                            .domain(tempData.map((x) => x.month.slice(0,3)))
                            .range([30, adjustedWidth])
                            .padding(0);

        const yAxis = d3.axisLeft(yScale)
                        .tickFormat(d => d.toString().slice(0,3));       

        const svg= d3.select(chartRef.current)
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height+25);

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
                    .attr('x', (d,i) => xScale(i)+1)
                    .attr('y', d => yScale(d.temperature))
                    .attr('width', xScale(1)-xScale(0) -1)
                   .attr('height', d => height - yScale(d.temperature))
                    .attr('fill', d=> interpolatorColourFunction(colourScale(d.temperature)))                        
                    .on('mouseover', (event, d) => {
                            tooltip.html(`${(d.month)}: ${String(d.temperature).slice(0,5)} `+ '&deg c')
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
                   .text(`Average MaxTemperature by Month (deg c)`);
            
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

    }, [tempData, height, width]);



    return(
        <>
        <svg className=''ref={chartRef} height={'100%'} width={'100%'} preserveAspectRatio='xMinYMin meet' ></svg>
        </>
    )
}

export default TempByMonth
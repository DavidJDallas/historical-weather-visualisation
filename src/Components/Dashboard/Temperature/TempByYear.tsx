import { TempByYearProps, TempDataYear } from "./Types";
import {useEffect, useState, useRef} from 'react';
import * as d3 from 'd3';
import { calculateMeanByYear } from "../../../Utils/CalculateMeanByYear";
import { makeListYearSelective } from "../../../Utils/MakeListYearSelective";

const TempByYear = ({dataByYear, width, height, yearValue}: TempByYearProps): JSX.Element => {


    const [tempData, setTempData] = useState< TempDataYear[]>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);
    
    useEffect(() => {

        const calculatedMean = calculateMeanByYear(dataByYear, yearValue, 'temperature');
        setTempData(calculatedMean);

    }, [dataByYear, yearValue])


    let selectiveListYear = makeListYearSelective(tempData, yearValue);

    useEffect(() => {

        d3.select(chartRef.current).selectAll('*').remove();

        let adjustedWidth = width-70;

        const xScale = d3.scaleLinear<number>()
                            .domain([d3.min(tempData, d=> d.year) as number ??0, d3.max(tempData, d=> d.year) as number ?? 0])
                            .range([0, adjustedWidth]);
    
            const yScale = d3.scaleLinear<number>()
                            .domain([d3.min(tempData.map((element) => element.temperature /1.2) as number[]) ?? 0, d3.max(tempData.map((element) => element.temperature *1.2) as number[]) ?? 0])
                            .range([height, 0]);
                        

        // const line = d3.line()
        //                 .y(d => yScale(d.temperature))


        const xAxis = d3.scaleBand()
                        .domain(selectiveListYear)
                        .range([0, adjustedWidth])
                        .padding(0);
        
        const yAxis = d3.axisLeft(yScale)
                        .tickFormat(d => d.toString().slice(0,3));         
      

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

        // svg.selectAll('')
      



        svg.append("path")
    .datum<TempDataYear[]>(tempData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 3)
    .attr("d", d3.line<TempDataYear>()
        .x(d => xScale(d.year) + 20)
        .y(d => yScale(d.temperature))
    )
    .on('mouseover', function (event, d) {
        const mouseX = xScale.invert(d3.pointer(event)[0] - 20);
        const bisect = d3.bisector((d: TempDataYear) => d.year).right;
        const index = bisect(tempData, mouseX);

        const dataPoint = tempData[index];
        tooltip.html(`${dataPoint.year}: ${String(dataPoint.temperature).slice(0, 6)} °C`)
            .style('visibility', 'visible');
    })
    .on('mousemove', (event) => {
        tooltip.style('top', event.pageY - 10 + 'px');
        tooltip.style('left', event.pageX + 10 + 'px');
    })
    .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
    });


            svg.append('g')
            .attr('transform', `translate(20, ${height})`)
            .call(d3.axisBottom(xAxis))
            .selectAll('text')
            .style('font-size', yearValue < 1980 ? '10px' : '11px') 
                    
        svg.append('g') 
            .attr('transform', `translate(20,0)`)              
            .call(yAxis)
            .selectAll('text')
            .style('font-size', yearValue < 1980 ? '9px' : '11px')       
            
            svg.selectAll('.grid-line')
            .data(yScale.ticks())
            .enter().append('line')
            .attr('class', 'grid-line')
            .attr('x1', 20)
            .attr('x2', width)
            .attr('y1', d => yScale(d))
            .attr('y2', d => yScale(d))
            .attr('stroke', '#ccc')
            .attr('stroke-opacity', 0.5);

            svg.append('text')
            .attr('x', width/2)
            .attr('y', 30)
            .style('text-anchor', 'middle')
            .style('font-size', '18px')
            .text(`Average Temperature Per Year`);
                    
        


    }, [yearValue, selectiveListYear])



    return(
        <>
               <svg className=''ref={chartRef} height={'100%'} width={'100%'}  ></svg>
        </>
    )

}

export default TempByYear
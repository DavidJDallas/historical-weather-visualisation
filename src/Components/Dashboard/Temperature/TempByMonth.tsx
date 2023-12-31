import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import { FilteredDataByMonth, TempByMonthProps, TempDataMonth } from './Types';
import './TempStyling.css'
import { filterDataByYear } from '../../../Utils/FilterDataByYear';
import { FormattedData } from '../Types';

const TempByMonth = ({dataByMonth, width, height, yearValue}: TempByMonthProps): JSX.Element => {

    const [tempData, setTempData] = useState< TempDataMonth[] | []>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);
    
    //useMemo is a React Hook that lets you cache the result of a calculation between re-renders. It looks at the dependency array and sees if anything has changed. If it has changed, it will re-run it. If not, it won't.
  
    useEffect(() => {
         const filteredDataByYear: FilteredDataByMonth[] = filterDataByYear(dataByMonth, yearValue);

        const calculateMean: TempDataMonth[] = filteredDataByYear.map((object) => ({
                month: object.month,
                temperature: d3.mean((object.data.map((element: FormattedData) => element.temperatureMax)))
            }))
        setTempData(calculateMean);
    }, [dataByMonth, yearValue]);
   

    useEffect((): void => {         
            

            if(tempData.length>0){  
                d3.select(chartRef.current).selectAll('*').remove();
                
            let adjustedWidth = width-30
            
            const colourScale = d3.scaleSequential()
                                .domain([0, d3.max(tempData.map((element) => element.temperature))])
    
            const interpolatorColourFunction = d3.interpolateRgb('blue', 'red')
      
            const xScale = d3.scaleLinear()
                                .domain([0, tempData.length])
                                .range([30, adjustedWidth]);
    
            const yScale = d3.scaleLinear()                             
                                    .domain([d3.min(tempData.map((element) => element.temperature /1.2) as number[]) ?? 0, d3.max(tempData.map((element) => element.temperature *1.2) as number[]) ?? 0])
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
                                .attr('height', height+200);

            //Below removes all tooltips before implementing new ones to avoid tooltips lagging. The d3.selectAll().remove() doesn't cover tooltips since tooltips are added to the body. 
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
                        .attr('x', (d,i) => xScale(i)+1)
                        .attr('y', d => yScale(d.temperature))
                        .attr('width', xScale(1)-xScale(0) -1)
                        .attr('height', d => height - yScale(d.temperature))
                        .attr('fill', d=> interpolatorColourFunction(colourScale(d.temperature)))                        
                        .on('mouseover', (event, d) => {
                            console.log(d.month, 'd.month');
                            console.log(d.temperature, 'd.temperature')
                            tooltip.html(`${(d.month)}: ${String(d.temperature).slice(0,6)} `+ '&deg c')
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
                       .text(`Average Max Temperature by Month (degrees c)`);
                
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
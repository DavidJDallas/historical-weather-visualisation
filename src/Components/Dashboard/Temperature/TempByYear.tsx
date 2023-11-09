import { TempByYearProps, TempDataYear } from "./Types";
import {useEffect, useState, useRef} from 'react';
import * as d3 from 'd3';

const TempByYear = ({dataByYear, width, height, yearValue}: TempByYearProps) => {


    const [tempData, setTempData] = useState< TempDataYear[]>([]);
    const chartRef = useRef<SVGSVGElement | null>(null);
    
    useEffect(() => {

        const filteredDataByYear = dataByYear.filter(year => year.year >= yearValue)
        const calculateMeanByYear = filteredDataByYear.map((year) => ({
            year: year.year,
            //Nullish operator used as d3.mean() passes on types of Number | undefined and causes problems later on in the code. This handles that and allows for just number type .
            temperature: d3.mean(year.data.map((element) => Number(element.temperatureMax))) ?? 0,
        }))
        console.log(filteredDataByYear)
        console.log(calculateMeanByYear)
        

        setTempData(calculateMeanByYear);
    }, [dataByYear, yearValue])


    let selectiveListYear = tempData                    
                    .filter(element => element.year % 2 === 0)
                    .map(element => element.year.toString())

    useEffect(() => {

        d3.select(chartRef.current).selectAll('*').remove();

        let adjustedWidth = width-70;


        const xScale = d3.scaleLinear<number>()
                            .domain([d3.min(tempData, d=> d.year) as number ??0, d3.max(tempData, d=> d.year) as number ?? 0])
                            .range([0, adjustedWidth]);
    
            const yScale = d3.scaleLinear<number>()
                            .domain([d3.min(tempData.map((element) => element.temperature) as number[]) ?? 0, d3.max(tempData.map((element) => element.temperature *1.2) as number[]) ?? 0])
                            .range([height, 0]);
                        

        // const line = d3.line()
        //                 .y(d => yScale(d.temperature))


        const xAxis = d3.scaleBand()
                        .domain(selectiveListYear)
                        .range([0, adjustedWidth])
                        .padding(0);
        
        const yAxis = d3.axisLeft(yScale)
                        .tickFormat(d => d.toString().slice(0,3)); 
        
      

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

        // svg.selectAll('')
        console.log(tempData.map(d => yScale(d.temperature)));



        svg.append("path")
            .datum<TempDataYear[]>(tempData)          
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line<TempDataYear>()
                .x(d => xScale(d.year) +20)
                .y(d => yScale(d.temperature))
            )
          

            svg.append('g')
            .attr('transform', `translate(20, ${height})`)
            .call(d3.axisBottom(xAxis))
            .selectAll('text')
            .style('font-size', '13px')
                    
        svg.append('g') 
            .attr('transform', `translate(20,0)`)              
            .call(yAxis)
            .selectAll('text')
            .style('font-size', '9px')                                       
                    
        


    }, [yearValue, selectiveListYear])



    return(
        <>
               <svg className=''ref={chartRef} height={'100%'} width={'100%'}  ></svg>
        </>
    )

}

export default TempByYear
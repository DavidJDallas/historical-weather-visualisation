import { TempByYearProps, TempDataYear } from "./Types";
import {useEffect, useState, useRef} from 'react';
import * as d3 from 'd3';

const TempByYear = ({dataByYear, width, height, yearValue}: TempByYearProps) => {


    const [tempData, setTempData] = useState<[] | TempDataYear[]>([]);
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

    console.log(typeof tempData[0].temperature)

    let selectiveListYear = tempData                    
                    .filter(element => element.year % 2 === 0)
                    .map(element => element.year.toString())

    useEffect(() => {

        d3.select(chartRef.current).selectAll('*').remove();

        let adjustedWidth = width-50;

        const xScale = d3.scaleLinear()
                            .domain([0, tempData.length])
                            .range([0, d3.max(tempData.map((element) => element.temperature))]);
    
        const yScale = d3.scaleLinear()
                            .domain([0, d3.max(tempData.map((element) => element.temperature))])
                            .range([height, 50]);

        // const line = d3.line()
        //                 .x(d => xScale(d.year))

        const xAxis = d3.scaleBand()
                        .domain(selectiveListYear)
                        .range([0, adjustedWidth])
                        .padding(0);
        
        const yAxis = d3.axisLeft(yScale)
                        .tickFormat(d => d.toString().slice(0,3)); 
        
        const colourScale = d3.scaleSequential()
                        .domain([0, d3.max(tempData.map((element) => element.temperature))])

        const interpolatorColourFunction = d3.interpolateRgb('blue', 'red')

        const svg= d3.select(chartRef.current)
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height+200);
        
        // const tooltip = d3.select('body').append('div')
        //                     .style('position', 'absolute')
        //                     .style('z-index', '10')
        //                     .style('visibility', 'hidden')
        //                     .style('background-color', 'white')
        //                     .style('border-style', 'solid')
        //                     .style('border-width', '2px')
        //                     .style('border-color', '#50e991')
        //                     .style('padding', '5px')
        //                     .style('font-size', '12px');

        // svg.selectAll('')
        
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xAxis))
            .selectAll('text')
            .style('font-size', '9px')
    
        svg.append('g')
            .attr('transform', 'translate(0,0')
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
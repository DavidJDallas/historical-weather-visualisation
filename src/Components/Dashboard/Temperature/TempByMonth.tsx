import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import * as d3 from 'd3';
import { FilteredDataByMonth, TempByMonthProps, TempDataMonth } from './Types';
import './TempStyling.css'
import { filterDataByYear } from '../../../Utils/FilterDataByYear';
import { FormattedData } from '../Types';
import BarChartTemplate from '../../../Graphs/BarChart';

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
   

    return(
        <>
         <BarChartTemplate
              data={tempData}
              width={width}
              height={height}
              yearValue={yearValue}
              title={'Average Temperature Per Month (degrees c)'}
              interpolateFirstColour={'blue'}
              interpolateSecondColour={'red'}
              xAccessor={'month'}
              yAccessor={'temperature'}
              domainFirstValueX={0}
              domainFirstValueY={0}
              sliceLength={3}
              gapBetweenBars={3}
              unit={'°c'}
        />
        </>
    )
}

export default TempByMonth
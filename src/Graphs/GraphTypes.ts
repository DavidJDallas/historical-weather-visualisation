import { RainDataMonth } from "../Components/Dashboard/Rain/RainTypes";

export interface BarChartProps{
    data: any[],
    width: number,
    height: number,
    yearValue: number,
    title: string,
    interpolateFirstColour: string,
    interpolateSecondColour: string,
    xAccessor: string,
    yAccessor: string,
    domainFirstValueX: any,
    domainFirstValueY: any,
    sliceLength: number,
    gapBetweenBars: number
}
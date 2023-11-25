import { RainDataMonth } from "../Components/Dashboard/Rain/RainTypes";

export interface BarChartProps{
    data: RainDataMonth[],
    width: number,
    height: number,
    yearValue: number,
    title: string,
    interpolateFirstColour: string,
    interpolateSecondColour: string,
    xAccessor: string,
    yAccessor: string
}
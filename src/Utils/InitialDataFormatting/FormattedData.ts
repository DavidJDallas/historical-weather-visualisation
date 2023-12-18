import { useMemo} from "react";
import * as d3 from 'd3';
import { DailyData } from "../../Services/ServicesTypes";

export const formatData = (data: DailyData) => {
    const parsedTime = d3.timeParse('%Y-%m-%d');

    const dates = data.time.map((element) => parsedTime(element)) as Date[];

    return dates.map((date, i) => ({
        date,
        rain: data.rain_sum[i],
        temperatureMax: data.temperature_2m_max[i]
    }))    
}
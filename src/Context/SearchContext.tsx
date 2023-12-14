import * as React from 'react';
import { createContext, useState } from 'react';
import { SearchContextProps } from './ContextTypes';
import { LatAndLong } from '../Services/ServicesTypes';
import { DailyData } from '../Services/ServicesTypes';


export const SearchContext = createContext<SearchContextProps >({
    place: '',
    setPlace: () => {},
    postcode: '',
    setPostcode: () => {},
    latAndLong: {latitude: 0, longitude: 0}, 
    setLatAndLong: () => {},
    weatherData: {
        rain_sum: [0,1,2],
        temperature_2m_max: [0,1,2],
        time: ['01', '02', '03']
    },
    setWeatherData: () => {}
});

const SearchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [place, setPlace]= useState<string>('');
    const [postcode, setPostcode] = useState<string>('');
    const [latAndLong, setLatAndLong] = useState<LatAndLong>({latitude: 0, longitude: 0});
    const [weatherData, setWeatherData] = useState<DailyData>(
        {
            rain_sum: [0,1,2],
            temperature_2m_max: [0,1,2],
            time: ['01', '02', '03']
        }
    );


    return <SearchContext.Provider value={{place, setPlace, postcode, setPostcode, latAndLong, setLatAndLong, weatherData, setWeatherData}}>
            {children}
        </SearchContext.Provider>
}

export default SearchProvider


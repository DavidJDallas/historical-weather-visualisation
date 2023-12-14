import * as React from 'react';
import { createContext, useState } from 'react';
import { Search } from 'react-router-dom';
import { LatAndLong } from '../Services/ServicesTypes';

interface SearchContextProps{
    place: string,
    setPlace: React.Dispatch<React.SetStateAction<string>>,
    postcode: string,
    setPostcode: React.Dispatch<React.SetStateAction<string>>,
    latAndLong: LatAndLong,
    setLatAndLong: React.Dispatch<React.SetStateAction<LatAndLong>>
}

export const SearchContext = createContext<SearchContextProps >({
    place: '',
    setPlace: () => {},
    postcode: '',
    setPostcode: () => {},
    latAndLong: {latitude: 0, longitude: 0}, 
    setLatAndLong: () => {}
});

const SearchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [place, setPlace]= useState<string>('');
    const [postcode, setPostcode] = useState<string>('');
    const [latAndLong, setLatAndLong] = useState<LatAndLong>({latitude: 0, longitude: 0});

    return <SearchContext.Provider value={{place, setPlace, postcode, setPostcode, latAndLong, setLatAndLong}}>
            {children}
        </SearchContext.Provider>
}

export default SearchProvider


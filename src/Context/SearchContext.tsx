import * as React from 'react';
import { createContext, useState } from 'react';
import { Search } from 'react-router-dom';

interface SearchContextProps{
    place: string,
    setPlace: React.Dispatch<React.SetStateAction<string>>,
    postcode: string,
    setPostcode: React.Dispatch<React.SetStateAction<string>>,
}

export const SearchContext = createContext<SearchContextProps | null>(null);

const SearchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [place, setPlace]= useState<string>('');
    const [postcode, setPostcode] = useState<string>('');

    return <SearchContext.Provider value={{place, setPlace, postcode, setPostcode}}>
            {children}
        </SearchContext.Provider>
}

export default SearchProvider


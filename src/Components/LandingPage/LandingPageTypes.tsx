import React from "react";
import { FormEvent } from "react";

export interface IndexProps {
    setPostcode:  (value: string) => void,
    getGeoLocationData: () => void
    postcode: string, 
}

export interface SearchFormProps{
    handlePostcodeSubmit: () => void,
    handlePlaceSubmit: () => void,
    
    setPostcode: (value: string) => void,
    postcode: string,
   
}
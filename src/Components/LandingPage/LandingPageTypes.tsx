import React from "react";
import { FormEvent } from "react";

export interface IndexProps {
  
    getGeoLocationData: () => void
   
}

export interface SearchFormProps{
    handlePostcodeSubmit: () => void,
    handlePlaceSubmit: () => void,
    
   
}
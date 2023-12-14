import React from "react";
import { FormEvent } from "react";
import { LatAndLong } from "../../Services/ServicesTypes";

export interface IndexProps {
  
    postcode: string,
    place: string,
    setLatAndLong: React.Dispatch<React.SetStateAction<LatAndLong>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
   
}

export interface SearchFormProps{
    handlePostcodeSubmit: () => void,
    handlePlaceSubmit: () => void,
    
   
}
import React from "react";

export interface IndexProps {
    setPlace: (value: string) => void,
    setPostcode:  (value: string) => void,
    getGeoLocationData: () => void
}

export interface SearchFormProps{
    handlePostcodeSubmit: (event: React.SyntheticEvent) => void,
    handlePlaceSubmit: (event: React.SyntheticEvent) => void,
    setPlace: (value: string) => void,
    setPostcode: (value: string) => void,
}
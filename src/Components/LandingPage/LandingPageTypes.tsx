import React from "react";
import { FormEvent } from "react";

export interface IndexProps {
    setPlace: (value: string) => void,
    setPostcode:  (value: string) => void,
    getGeoLocationData: () => void
    postcode: string,
    place: string
}

export interface SearchFormProps{
    handlePostcodeSubmit: () => void,
    handlePlaceSubmit: () => void,
    setPlace: (value: string) => void,
    setPostcode: (value: string) => void,
    postcode: string,
    place: string
}
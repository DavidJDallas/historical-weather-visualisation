import React from "react";

export interface IndexProps {
    setPlace: (value: string) => void,
    setPostcode:  (value: string) => void,
}

export interface SearchFormProps{
    handleSubmit: (event: React.SyntheticEvent) => void,
    setPlace: (value: string) => void,
    setPostcode: (value: string) => void,
}
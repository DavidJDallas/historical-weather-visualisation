import { LatAndLong } from "../Services/ServicesTypes";

export interface getGeoLocationDataProps{
    postcode: string,
    place: string,
    setLatAndLong: React.Dispatch<React.SetStateAction<LatAndLong>>,
    apiCall: Promise<LatAndLong>   
}
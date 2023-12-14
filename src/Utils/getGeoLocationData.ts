import { DailyData, LatAndLong } from "../Services/ServicesTypes";
import { getGeoLocationDataProps } from "./UtilsTypes";
import { getGeoLocation } from "../Services/APICalls";

export const getGeoLocationData = async(
    postcode: string, 
    place: string, 
    setLatAndLong: React.Dispatch<React.SetStateAction<LatAndLong>>, 
    getGeoLocation: any
    ): Promise<void> => {

    try{
        const {latitude, longitude} = await getGeoLocation(postcode || place) as LatAndLong;
        setLatAndLong({
            latitude,
            longitude
        })
    }
    catch(err){
        console.log(err);
    }
}
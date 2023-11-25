import { FormattedData } from "../Components/Dashboard/Types";

export const filterDataByYear = (data: any, yearValue: number) => {

    return data.map((element: any) => {
      
        return {
            ...element,
            data: element.data.filter((day: FormattedData) => {
                let dateObj = new Date(day.date);
                let year: number = dateObj.getFullYear();
                return year>= yearValue
            })
        }
    })
}
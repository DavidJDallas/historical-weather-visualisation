import { FilteredDataByYear } from "../Components/Dashboard/Temperature/Types"

export const filterDataByYear = (data: any, yearValue: number): FilteredDataByYear[] => {

    return data.map((element: any) => {
        return {
            ...element,
            data: element.data.filter((day: any) => {
                let dateObj = new Date(day.date);
                let year = dateObj.getFullYear();
                return year>= yearValue
            })
        }
    })
}
import { TempDataYear } from "../Components/Dashboard/Temperature/Types";

export const makeListYearSelective = (data: TempDataYear[], yearValue: number) => {
    return data.filter((element: TempDataYear) => yearValue > 1976 ? element.year % 3 === 0 : element.year % 4 ===0 )
        .map( (element: TempDataYear) => element.year.toString());
}
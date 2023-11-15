import { TempDataYear } from "../Components/Dashboard/Temperature/Types";

export const makeListYearSelective = (data: TempDataYear[], yearValue: number) => {
    data.filter(element => yearValue > 1976 ? element.year % 3 === 0 : element.year % 4 ===0 )
        .map( element => element.year.toString());
}
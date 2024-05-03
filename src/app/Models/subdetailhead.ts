import { Idetailhead } from "./detailhead";

export interface SubdetailheadResponse {
    result:       Idetailhead[];
    statusCode:   number;
    errorMessage: string;
}
export interface singleSubDetailheadResponse {
    result:       Idetailhead;
    statusCode:   number;
    errorMessage: string;
}

export interface ISubdetailhead {
id? : number ;
name: string ;
code: string ;
detailHeadId?: number ;
}


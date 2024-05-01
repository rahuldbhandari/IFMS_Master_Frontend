export interface detailheadResponse {
    result:       Idetailhead[];
    statusCode:   number;
    errorMessage: string;
}
export interface singleDetailheadResponse {
    result:       Idetailhead;
    statusCode:   number;
    errorMessage: string;
}

export interface Idetailhead{
    id?: number ,
    code: string,
    name: string


}
export interface MajorheadResponse {
    result: Majorhead[];
    statusCode: number;
    errorMessage: string;
}
export interface SingleMajorheadResponse {
    result: Majorhead;
    statusCode: number;
    errorMessage: string;
}
export interface Majorhead {
    id?: number,
    code: string,
    name: string,
    // isDeleted: boolean,
}

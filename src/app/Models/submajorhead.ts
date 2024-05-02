export interface SubmajorheadResponse {
    result: Submajorhead[];
    statusCode: number;
    errorMessage: string;
}

export interface SingleSubmajorheadResponse {
    result: Submajorhead;
    statusCode: number;
    errorMessage: string;
}

export interface Submajorhead {
    id?: number,
    code: string,
    name: string,
    majorHeadId?: number,
}

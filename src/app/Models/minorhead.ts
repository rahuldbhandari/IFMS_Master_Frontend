
export interface MinorheadResponse {
    result: Minorhead[];
    statusCode: number;
    errorMessage: string;
}

export interface SingleMinorheadResponse {
    result: Minorhead;
    statusCode: number;
    errorMessage: string;
}

export interface Minorhead {
    id?: number,
    code: string,
    name: string,
    subMajorId?: number,
}


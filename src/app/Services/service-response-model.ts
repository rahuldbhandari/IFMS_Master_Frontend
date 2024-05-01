export interface ServiceResponse<T> {
    apiResponseStatus :number;
    errorMessage: string;
    result:T;
}
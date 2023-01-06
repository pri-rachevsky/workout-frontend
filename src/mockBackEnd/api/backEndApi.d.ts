import { HttpStatusCode } from "../../models/httpClient";

export type FailedResponse = { statusCode: HttpStatusCode; body: { error: string } };
export type SuccessfulResponse<T> = { statusCode: HttpStatusCode; body?: T | T[] };
export type SuccessfulGetResponse<T> = { statusCode: HttpStatusCode; body?: T | T[] };
export type SuccessfulDeleteResponse = { statusCode: HttpStatusCode };
export type SuccessfulCreateAndUpdateResponse<T> = { statusCode: HttpStatusCode; body: T | T[] };

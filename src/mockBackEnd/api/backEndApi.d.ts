import { StatusCode } from "../../models/HttpClient";

export type FailedResponse = { statusCode: StatusCode; body: { error: string } };
export type SuccessfulResponse<T> = { statusCode: StatusCode; body?: T | T[] };
export type SuccessfulGetResponse<T> = { statusCode: StatusCode; body: T | T[] };
export type SuccessfulDeleteResponse = { statusCode: StatusCode };
export type SuccessfulCreateAndUpdateResponse<T> = { statusCode: StatusCode; body: T | T[] };

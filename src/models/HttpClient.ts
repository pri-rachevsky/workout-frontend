/* eslint-disable @typescript-eslint/no-explicit-any */
export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T | T[] | ErrorBody;
};
export type ErrorBody = { error: any };

export type HttpGetParams<HeadersT = any, QueryT = any> = {
  url: string;
  headers?: HeadersT;
  query?: QueryT;
};

export type HttpPostParams<HeadersT = any, BodyT = any> = {
  url: string;
  headers?: HeadersT;
  body?: BodyT;
};

export type HttpPatchParams<HeadersT = any, BodyT = any> = {
  url: string;
  headers?: HeadersT;
  body?: BodyT;
};

export type HttpDeleteParams<HeadersT = any> = {
  url: string;
  headers?: HeadersT;
};

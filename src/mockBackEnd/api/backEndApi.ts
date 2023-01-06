import { HttpStatusCode } from "../../models/httpClient";
import { createDbQuery, deleteDbQuery, readDbQuery, updateDbQuery } from "../dataBank/dataBankQuery";
import {
  SuccessfulCreateAndUpdateResponse,
  FailedResponse,
  SuccessfulDeleteResponse,
  SuccessfulGetResponse,
  SuccessfulResponse
} from "./backEndApi.d";

export class BackEndApi {
  public static async post<T>(
    url: string,
    params: object,
    entity: T
  ): Promise<SuccessfulCreateAndUpdateResponse<T> | FailedResponse> {
    const { error, table } = this.validateUrlAndParams(url, ["create", "login"], params, []);
    if (error) return error;

    try {
      const response = await createDbQuery<T>(table, entity);
      return response === "ok"
        ? (this.createSuccessResponse<T>(HttpStatusCode.created, entity) as SuccessfulCreateAndUpdateResponse<T>)
        : this.createFailResponse(HttpStatusCode.serverError, "unexpected");
    } catch (error) {
      return this.createFailResponse(HttpStatusCode.serverError, error as string);
    }
  }

  public static async patch<T>(
    url: string,
    params: { keyName: keyof T },
    entity: T
  ): Promise<SuccessfulCreateAndUpdateResponse<T> | FailedResponse> {
    const { error, table } = this.validateUrlAndParams(url, ["update"], params, ["keyName"]);
    if (error) return error;

    try {
      const { keyName } = params;
      const response = await updateDbQuery<T>(table, keyName, entity);
      return response === "ok"
        ? (this.createSuccessResponse<T>(HttpStatusCode.ok, entity) as SuccessfulCreateAndUpdateResponse<T>)
        : this.createFailResponse(HttpStatusCode.serverError, "unexpected");
    } catch (error) {
      return this.createFailResponse(HttpStatusCode.serverError, error as string);
    }
  }

  public static async get<T>(
    url: string,
    params?: { keyNames: Array<keyof T>; keyValues: Array<T[keyof T]> }
  ): Promise<SuccessfulGetResponse<T> | FailedResponse> {
    let validationValue;
    if (url.includes("readAll")) {
      validationValue = this.validateUrl(url, ["readAll"]);
    } else {
      validationValue = this.validateUrlAndParams(url, ["read"], params, ["keyNames", "keyValues"]);
    }
    const { error, table, action } = validationValue;

    if (error) return error;

    try {
      const response = await readDbQuery<T>(table);
      if (action === "read") {
        const { keyNames, keyValues } = params;
        const entity = response.find((entity) => {
          const hasAllConditions = keyNames.every((keyName, index) => entity[keyName] === keyValues[index]);
          return hasAllConditions;
        });
        return this.createSuccessResponse<T>(HttpStatusCode.ok, entity) as SuccessfulGetResponse<T>;
      }
      return { statusCode: HttpStatusCode.ok, body: response };
    } catch (error) {
      return this.createFailResponse(HttpStatusCode.serverError, error as string);
    }
  }

  public static async delete<T>(
    url: string,
    params: { keyName: keyof T; keyValue: T[keyof T] }
  ): Promise<SuccessfulDeleteResponse | FailedResponse> {
    const { error, table } = this.validateUrlAndParams(url, ["delete"], params, ["keyName", "keyValue"]);
    if (error) return error;

    try {
      const { keyName, keyValue } = params;
      const response = await deleteDbQuery<T>(table, keyName, keyValue);
      return response === "ok"
        ? this.createSuccessResponse<T>()
        : this.createFailResponse(HttpStatusCode.serverError, "unexpected");
    } catch (error) {
      return this.createFailResponse(HttpStatusCode.serverError, error as string);
    }
  }

  private static validateUrlAndParams(
    url: string,
    recognizedActions: string[],
    params: object,
    requiredProperties: string[]
  ): { error?: FailedResponse; table: string; action: string } {
    const { urlError, table, action } = this.validateUrl(url, recognizedActions);
    if (urlError) return { error: urlError, table, action };

    const missingPropertyError = this.validateParams(params, requiredProperties, recognizedActions);
    if (missingPropertyError) return { error: missingPropertyError, table, action };

    return { table, action };
  }

  private static validateUrl(
    url: string,
    recognizedActions: string[]
  ): { urlError: null | FailedResponse; table: string; action: string } {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, table, action] = url.split("/");
    let errorMessage = "";
    if (!table || table === "" || !action || action === "") {
      errorMessage = "url incomplete, provide table and action at least";
    } else if (!recognizedActions.includes(action)) {
      errorMessage = "url action not recognized";
    }
    const urlError = errorMessage ? this.createFailResponse(HttpStatusCode.badRequest, errorMessage) : null;
    return { urlError, table, action };
  }

  private static validateParams(
    params: object,
    requiredProperties: string[],
    actions: string[]
  ): null | FailedResponse {
    const missingProperty = requiredProperties.find((property) => params[property] === undefined);
    return missingProperty
      ? this.createFailResponse(HttpStatusCode.badRequest, `${missingProperty} param is required for ${actions} action`)
      : null;
  }

  private static createSuccessResponse<T>(statusCode?: HttpStatusCode, data?: T | T[]): SuccessfulResponse<T> {
    return data && statusCode ? { statusCode, body: data } : { statusCode: HttpStatusCode.noContent };
  }

  private static createFailResponse(statusCode: HttpStatusCode, error: string): FailedResponse {
    return { statusCode, body: { error } };
  }
}

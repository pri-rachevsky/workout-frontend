import { StatusCode } from "../../models/HttpClient";
import { createDbQuery } from "../data-bank/data-bank-query";

export class BackEndApi {
  public static async post<T>(url: string, entity: T): Promise<{ statusCode: StatusCode; body?: T | { error: any } }> {
    const [_, table, action] = url.split("/");

    if (action === "create") {
      try {
        const response = await createDbQuery<T>(table, entity);
        return response === "ok"
          ? { statusCode: StatusCode.created, body: entity }
          : { statusCode: StatusCode.serverError, body: { error: "unexpected" } };
      } catch (error) {
        return { statusCode: StatusCode.serverError, body: { error } };
      }
    }
    return { statusCode: StatusCode.badRequest, body: { error: "url action not provided" } };
  }
}

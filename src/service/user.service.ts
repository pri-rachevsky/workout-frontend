import { HttpClient } from "../infra/http/httpClient";
import { ErrorBody, HttpStatusCode } from "../models/httpClient";
import { User } from "../models/user";

export class UserService {
  public static async login(username: string, password: string): Promise<User | null> {
    const { body, statusCode } = await HttpClient.get<User>({ url: "/user/read", query: { username, password } });

    if (statusCode === HttpStatusCode.ok) return body as User;
    if (statusCode === HttpStatusCode.noContent) return null;
    throw new Error((body as ErrorBody).error);
  }
}

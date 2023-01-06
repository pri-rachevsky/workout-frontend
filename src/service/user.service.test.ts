import { HttpClient } from "../infra/http/httpClient";
import { studentMock } from "../infra/test/userMock";
import { HttpStatusCode } from "../models/httpClient";
import { UserService } from "./user.service";

jest.mock("../infra/http/httpClient");

describe("UserService", () => {
  it("should call get HttpClient rightly and return user when success", async () => {
    (HttpClient.get as jest.Mock).mockResolvedValue({ statusCode: HttpStatusCode.ok, body: studentMock });
    const result = await UserService.login("pri", "1234");
    expect(HttpClient.get).toHaveBeenCalledWith({ url: "/user/read", query: { username: "pri", password: "1234" } });
    expect(result).toStrictEqual(studentMock);
  });
  it("should return user null when has no user with passes username and password", async () => {
    (HttpClient.get as jest.Mock).mockResolvedValue({ statusCode: HttpStatusCode.noContent });
    const result = await UserService.login("pri", "1234");
    expect(HttpClient.get).toHaveBeenCalledWith({ url: "/user/read", query: { username: "pri", password: "1234" } });
    expect(result).toEqual(null);
  });
});

import { BackEndApi } from "../../mockBackEnd/api/backEndApi";
import { HttpClient } from "./httpClient";
import { studentMock } from "../test/userMock";
import { HttpStatusCode } from "../../models/httpClient";

jest.mock("../../mockBackEnd/api/backEndApi");

describe("HttpClient", () => {
  describe("get", () => {
    it("should call get HttpClient and without params when do not have query", async () => {
      (BackEndApi.get as jest.Mock).mockResolvedValue({ statusCode: HttpStatusCode.ok, body: studentMock });

      await HttpClient.get({ url: "/readAll/user" });
      expect(BackEndApi.get).toHaveBeenCalledWith("/readAll/user");
    });
    it("should call get HttpClient and transform query in params", async () => {
      (BackEndApi.get as jest.Mock).mockResolvedValue({ statusCode: HttpStatusCode.ok, body: studentMock });

      await HttpClient.get({ url: "/user/read", query: { username: "pri", password: "1234" } });
      expect(BackEndApi.get).toHaveBeenCalledWith("/user/read", {
        keyNames: ["username", "password"],
        keyValues: ["pri", "1234"]
      });
    });
  });
});

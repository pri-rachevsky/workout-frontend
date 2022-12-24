import { StatusCode } from "../../models/HttpClient";
import { createDbQuery } from "../data-bank/data-bank-query";
import { BackEndApi } from "./back-end-api";

jest.mock("../data-bank/data-bank-query");
describe("BackEndApi", () => {
  describe("Post", () => {
    describe("when the url has create", () => {
      it("should return 201 and call createDbQuery passing the table from url and entity", async () => {
        const mockedCreateDbQuery = (createDbQuery as jest.Mock).mockResolvedValue("ok");
        const entity = { id: 1, name: "priscila" };
        const result = await BackEndApi.post("/table/create", entity);

        expect(mockedCreateDbQuery).toHaveBeenCalledWith("table", entity);
        expect(result).toStrictEqual({
          statusCode: StatusCode.created,
          body: entity
        });
      });
      it("should return 500 when db rejects", async () => {
        (createDbQuery as jest.Mock).mockRejectedValue("error consulting data bank");
        const result = await BackEndApi.post("/table/create", {});

        expect(result).toStrictEqual({
          statusCode: StatusCode.serverError,
          body: { error: "error consulting data bank" }
        });
      });
      it("should return 500 when db resolves without ok return", async () => {
        (createDbQuery as jest.Mock).mockResolvedValue("what happened here?");
        const result = await BackEndApi.post("/table/create", {});

        expect(result).toStrictEqual({
          statusCode: StatusCode.serverError,
          body: { error: "unexpected" }
        });
      });
    });
    it("should return 400 when does not have any action on url", async () => {
      const result = await BackEndApi.post("/table/nothing", {});

      expect(result).toStrictEqual({
        statusCode: StatusCode.badRequest,
        body: { error: "url action not provided" }
      });
    });
  });
});

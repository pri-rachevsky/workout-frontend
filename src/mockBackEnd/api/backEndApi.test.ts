import { HttpStatusCode } from "../../models/httpClient";
import { createDbQuery, deleteDbQuery, readDbQuery, updateDbQuery } from "../dataBank/dataBankQuery";
import { BackEndApi } from "./backEndApi";

jest.mock("../dataBank/dataBankQuery");
describe("BackEndApi", () => {
  type MockEntity = { id: number; name: string };
  type BackEndApiMethod = "post" | "get" | "patch" | "delete";
  const entity = { id: 1, name: "priscila" };
  const validateUrlTableAndActionProvided = async (method: BackEndApiMethod) => {
    const expectedError = {
      statusCode: HttpStatusCode.badRequest,
      body: { error: "url incomplete, provide table and action at least" }
    };

    // @ts-expect-error: Let's ignore a compile error to make possible test this case
    let result = await BackEndApi[method]<MockEntity>("//");
    expect(result).toStrictEqual(expectedError);

    // @ts-expect-error: Let's ignore a compile error to make possible test this case
    result = await BackEndApi[method]<MockEntity>("/a/");
    expect(result).toStrictEqual(expectedError);

    // @ts-expect-error: Let's ignore a compile error to make possible test this case
    result = await BackEndApi[method]<MockEntity>("a//");
    expect(result).toStrictEqual(expectedError);

    // @ts-expect-error: Let's ignore a compile error to make possible test this case
    result = await BackEndApi[method]<MockEntity>("//a");
    expect(result).toStrictEqual(expectedError);

    // @ts-expect-error: Let's ignore a compile error to make possible test this case
    result = await BackEndApi[method]<MockEntity>("a//a");
    expect(result).toStrictEqual(expectedError);

    // @ts-expect-error: Let's ignore a compile error to make possible test this case
    result = await BackEndApi[method]<MockEntity>("a/a/");
    expect(result).toStrictEqual(expectedError);
  };
  const validateUrlActionRecognized = async (method: BackEndApiMethod) => {
    // @ts-expect-error: Let's ignore a compile error to make possible test this case
    const result = await BackEndApi[method]<MockEntity>("/table/dummy");

    expect(result).toStrictEqual({
      statusCode: HttpStatusCode.badRequest,
      body: { error: "url action not recognized" }
    });
  };
  describe("Post", () => {
    describe("when the url has create", () => {
      it("should return 201 and call createDbQuery passing the table and entity", async () => {
        const mockedCreateDbQuery = (createDbQuery as jest.Mock).mockResolvedValue("ok");
        const result = await BackEndApi.post<MockEntity>("/table/create", {}, entity);

        expect(mockedCreateDbQuery).toHaveBeenCalledWith("table", entity);
        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.created,
          body: entity
        });
      });
      describe("creating user", () => {
        it("should return 400 when the username already exist", async () => {
          const mockedCreateDbQuery = (createDbQuery as jest.Mock).mockResolvedValue("ok");
          const mockedReadDbQuery = (readDbQuery as jest.Mock).mockResolvedValue([{ username: "name123" }]);
          const result = await BackEndApi.post("/user/create", {}, { username: "name123" });

          expect(mockedReadDbQuery).toHaveBeenCalledWith("user");
          expect(mockedCreateDbQuery).not.toHaveBeenCalled();
          expect(result).toStrictEqual({
            statusCode: HttpStatusCode.badRequest,
            body: { error: "username already exists" }
          });
        });
      });
      it("should return 500 when db rejects", async () => {
        (createDbQuery as jest.Mock).mockRejectedValue("error consulting data bank");
        const result = await BackEndApi.post<MockEntity>("/table/create", {}, entity);

        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.badRequest,
          body: { error: "error consulting data bank" }
        });
      });
      it("should return 500 when db resolves without ok return", async () => {
        (createDbQuery as jest.Mock).mockResolvedValue("what happened here?");
        const result = await BackEndApi.post<MockEntity>("/table/create", {}, entity);

        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.serverError,
          body: { error: "unexpected" }
        });
      });
    });
    it("should return 400 when does not have at least 2 string to be table and action on url", () =>
      validateUrlTableAndActionProvided("post"));
    it("should return 400 when does not have any action recognized on url", () => validateUrlActionRecognized("post"));
  });
  describe("Patch", () => {
    describe("when the url has update", () => {
      it("should return 200 and call updateDbQuery passing the table, data and entity", async () => {
        const mockedUpdateDbQuery = (updateDbQuery as jest.Mock).mockResolvedValue("ok");
        const result = await BackEndApi.patch<MockEntity>("/table/update", { keyName: "id" }, entity);

        expect(mockedUpdateDbQuery).toHaveBeenCalledWith("table", "id", entity);
        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.ok,
          body: entity
        });
      });
      it("should return 400 when it's update action without keyName", async () => {
        // @ts-expect-error: Let's ignore a compile error to make possible test this case
        const result = await BackEndApi.patch<MockEntity>("/table/update", {}, {});

        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.badRequest,
          body: { error: "keyName param is required for update action" }
        });
      });
      it("should return 500 when db rejects", async () => {
        (updateDbQuery as jest.Mock).mockRejectedValue("error consulting data bank");
        const result = await BackEndApi.patch<MockEntity>("/table/update", { keyName: "id" }, entity);

        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.serverError,
          body: { error: "error consulting data bank" }
        });
      });
      it("should return 500 when db resolves without ok return", async () => {
        (updateDbQuery as jest.Mock).mockResolvedValue("what happened here?");
        const result = await BackEndApi.patch<MockEntity>("/table/update", { keyName: "id" }, entity);

        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.serverError,
          body: { error: "unexpected" }
        });
      });
    });
    it("should return 400 when does not have at least 2 string to be table and action on url", () =>
      validateUrlTableAndActionProvided("patch"));
    it("should return 400 when does not have any action recognized on url", () => validateUrlActionRecognized("patch"));
  });
  describe("Get", () => {
    it("should return entity and call readDbQuery passing the table, id value and id name when the url has read", async () => {
      const mockedReadDbQuery = (readDbQuery as jest.Mock).mockResolvedValue([entity]);
      const result = await BackEndApi.get<MockEntity>("/table/read", {
        keyNames: ["id", "name"],
        keyValues: [1, "priscila"]
      });

      expect(mockedReadDbQuery).toHaveBeenCalledWith("table");
      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.ok,
        body: entity
      });
    });
    it("should return 204 when read correctly but did not found any entity with that key", async () => {
      const mockedReadDbQuery = (readDbQuery as jest.Mock).mockResolvedValue([]);
      const result = await BackEndApi.get<MockEntity>("/table/read", { keyNames: ["id"], keyValues: [1] });

      expect(mockedReadDbQuery).toHaveBeenCalledWith("table");
      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.noContent
      });
    });
    it("should return entities and call readDbQuery passing the table, id value and id name when the url has readAll", async () => {
      const entities = [entity, { id: 2, name: "may" }, { id: 3, name: "john" }];
      const mockedReadDbQuery = (readDbQuery as jest.Mock).mockResolvedValue(entities);
      const result = await BackEndApi.get<MockEntity>("/table/readAll");

      expect(mockedReadDbQuery).toHaveBeenCalledWith("table");
      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.ok,
        body: entities
      });
    });
    it("should return 400 when it's read action without keyNames", async () => {
      // @ts-expect-error: Let's ignore a compile error to make possible test this case
      const result = await BackEndApi.get<MockEntity>("/table/read", { keyValues: [1] });

      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.badRequest,
        body: { error: "keyNames param is required for read action" }
      });
    });
    it("should return 400 when it's read action without keyValues", async () => {
      // @ts-expect-error: Let's ignore a compile error to make possible test this case
      const result = await BackEndApi.get<MockEntity>("/table/read", { keyNames: ["id"] });

      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.badRequest,
        body: { error: "keyValues param is required for read action" }
      });
    });
    it("should return 500 when db rejects", async () => {
      (readDbQuery as jest.Mock).mockRejectedValue("error consulting data bank");
      const result = await BackEndApi.get<MockEntity>("/table/read", { keyNames: ["id"], keyValues: [1] });

      expect(result).toStrictEqual({
        statusCode: HttpStatusCode.serverError,
        body: { error: "error consulting data bank" }
      });
    });
    it("should return 400 when does not have at least 2 string to be table and action on url", () =>
      validateUrlTableAndActionProvided("get"));
    it("should return 400 when does not have any action recognized on url", () => validateUrlActionRecognized("get"));
  });
  describe("Delete", () => {
    describe("when the url has delete", () => {
      it("should return 204 and call deleteDbQuery passing the table, id value and id name when the url has delete", async () => {
        const mockedDeleteDbQuery = (deleteDbQuery as jest.Mock).mockResolvedValue("ok");
        const result = await BackEndApi.delete<MockEntity>("/table/delete", { keyName: "id", keyValue: 1 });

        expect(mockedDeleteDbQuery).toHaveBeenCalledWith("table", "id", 1);
        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.noContent
        });
      });
      it("should return 400 when it's delete action without keyName", async () => {
        // @ts-expect-error: Let's ignore a compile error to make possible test this case
        const result = await BackEndApi.delete<MockEntity>("/table/delete", { keyValue: 1 });

        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.badRequest,
          body: { error: "keyName param is required for delete action" }
        });
      });
      it("should return 400 when it's delete action without keyValue", async () => {
        // @ts-expect-error: Let's ignore a compile error to make possible test this case
        const result = await BackEndApi.delete<MockEntity>("/table/delete", { keyName: "id" });

        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.badRequest,
          body: { error: "keyValue param is required for delete action" }
        });
      });
      it("should return 500 when db rejects", async () => {
        (deleteDbQuery as jest.Mock).mockRejectedValue("error consulting data bank");
        const result = await BackEndApi.delete<MockEntity>("/table/delete", { keyName: "id", keyValue: 1 });

        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.serverError,
          body: { error: "error consulting data bank" }
        });
      });
      it("should return 500 when db resolves without ok return", async () => {
        (deleteDbQuery as jest.Mock).mockResolvedValue("what happened here?");
        const result = await BackEndApi.delete<MockEntity>("/table/delete", { keyName: "id", keyValue: 1 });

        expect(result).toStrictEqual({
          statusCode: HttpStatusCode.serverError,
          body: { error: "unexpected" }
        });
      });
    });
    it("should return 400 when does not have at least 2 string to be table and action on url", () =>
      validateUrlTableAndActionProvided("delete"));
    it("should return 400 when does not have any action recognized on url", () =>
      validateUrlActionRecognized("delete"));
  });
});

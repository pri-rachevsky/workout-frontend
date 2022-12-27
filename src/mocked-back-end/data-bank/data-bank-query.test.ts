import {
  createDbQuery,
  deleteDbQuery,
  getDataBank,
  initializeDataBank,
  readDbQuery,
  setIsDataBankInitialized,
  updateDbQuery
} from "./data-bank-query";

type Table = { id: number; name: string };
describe("DataBankQuery", () => {
  describe("happy paths - should resolve", () => {
    const initialTableData = [
      { id: 1, name: "priscila" },
      { id: 2, name: "john" }
    ];
    beforeEach(() => {
      setIsDataBankInitialized(false);
      initializeDataBank({
        table: initialTableData,
        tableDummy: []
      });
    });
    describe("create", () => {
      it("should add object on the table and receive ok", async () => {
        const result = await createDbQuery<Table>("table", { id: 3, name: "mary" });

        expect(getDataBank().table).toStrictEqual([
          { id: 1, name: "priscila" },
          { id: 2, name: "john" },
          { id: 3, name: "mary" }
        ]);
        expect(result).toBe("ok");
      });
    });
    describe("read", () => {
      it("should get all object from the table and data bank should not have changes", async () => {
        const result = await readDbQuery<Table>("table");

        expect(getDataBank().table).toStrictEqual(initialTableData);
        expect(result).toStrictEqual(initialTableData);
      });
    });
    describe("update", () => {
      it("should update only the specific object on the table", async () => {
        const result = await updateDbQuery<Table>("table", "id", { id: 1, name: "pri" });

        expect(getDataBank().table).toStrictEqual([
          { id: 1, name: "pri" },
          { id: 2, name: "john" }
        ]);
        expect(result).toBe("ok");
      });
    });
    describe("delete", () => {
      it("should update only the specific object on the table", async () => {
        const result = await deleteDbQuery<Table>("table", "id", 1);

        expect(getDataBank().table).toStrictEqual([{ id: 2, name: "john" }]);
        expect(result).toBe("ok");
      });
    });
  });
  describe("error - should rejects", () => {
    beforeAll(() => {
      setIsDataBankInitialized(false);
      initializeDataBank({});
    });
    describe("when table does not exist", () => {
      it("create", async () => {
        const result = createDbQuery<Table>("table", { id: 3, name: "mary" });
        await expect(result).rejects.toEqual("Table does not exists on data bank");
      });
      it("read", async () => {
        const result = readDbQuery<Table>("table");
        await expect(result).rejects.toEqual("Table does not exists on data bank");
      });
      it("update", async () => {
        const result = updateDbQuery<Table>("table", "id", { id: 3, name: "mary" });
        await expect(result).rejects.toEqual("Table does not exists on data bank");
      });
      it("delete", async () => {
        const result = deleteDbQuery<Table>("table", "id", 3);
        await expect(result).rejects.toEqual("Table does not exists on data bank");
      });
    });
  });
});

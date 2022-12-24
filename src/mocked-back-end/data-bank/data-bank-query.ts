import { DataBank } from "./data-bank";
import INITIAL_DATA_BANK from "./data-bank.json";

const delayTime = 500;
let DATA_BANK: DataBank = INITIAL_DATA_BANK;

export function createDbQuery<T>(table: string, entity: T): Promise<string> {
  return makeAsyncAndDelay<string>(table, () => {
    DATA_BANK[table] = [...DATA_BANK[table], entity];
    return "ok";
  });
}

export function readDbQuery<T>(table: string): Promise<T[]> {
  return makeAsyncAndDelay<T[]>(table, () => DATA_BANK[table]);
}

export function updateDbQuery<T>(table: string, idPropertyName: keyof T, data: T): Promise<string> {
  return makeAsyncAndDelay<string>(table, () => {
    DATA_BANK[table] = DATA_BANK[table].map((entity: T) =>
      entity[idPropertyName] === data[idPropertyName] ? data : entity
    );
    return "ok";
  });
}

export function deleteDbQuery<T>(table: string, idPropertyName: keyof T, idValue: T[keyof T]): Promise<string> {
  return makeAsyncAndDelay<string>(table, () => {
    DATA_BANK[table] = DATA_BANK[table].filter((entity: T) => entity[idPropertyName] !== idValue);
    return "ok";
  });
}

function makeAsyncAndDelay<R>(table: string, callback: () => {}): Promise<R> {
  initializeDataBank();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!DATA_BANK[table]) {
        reject("Table does not exists on data bank");
        return;
      }

      try {
        const result = callback() as R;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, delayTime);
  });
}

// unit test helper
let isDataBankInitialized = false;
export function initializeDataBank(db?: DataBank): void {
  if (isDataBankInitialized) return;

  DATA_BANK = db || INITIAL_DATA_BANK;
  isDataBankInitialized = true;
}
export function setIsDataBankInitialized(isDataBankInitializedValue: boolean): void {
  isDataBankInitialized = isDataBankInitializedValue;
}
export function getDataBank(): DataBank {
  return DATA_BANK;
}

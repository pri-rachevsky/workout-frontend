import { BackEndApi } from "../../mockBackEnd/api/backEndApi";
import {
  HttpDeleteParams,
  HttpGetParams,
  HttpPatchParams,
  HttpPostParams,
  HttpResponse
} from "../../models/httpClient";

// when create back end should change to axios
export class HttpClient {
  private static readonly baseUrl: string = "";

  public static get<T>({ url, headers, query }: HttpGetParams): Promise<HttpResponse<T>> {
    let queryForMockedBackEnd;
    if (query) {
      const keyNames = [];
      const keyValues = [];
      Object.entries(query).forEach(([key, value]) => {
        keyNames.push(key);
        keyValues.push(value);
      });
      queryForMockedBackEnd = { keyNames, keyValues };
    }
    if (headers || queryForMockedBackEnd) {
      return BackEndApi.get<T>(`${this.baseUrl}${url}`, { ...(headers || {}), ...(queryForMockedBackEnd || {}) });
    }
    return BackEndApi.get<T>(`${this.baseUrl}${url}`);
  }

  public static post<T>({ url, headers, body }: HttpPostParams): Promise<HttpResponse<T>> {
    return BackEndApi.post<T>(`${this.baseUrl}${url}`, headers, body);
  }

  public static patch<T>({ url, headers, body }: HttpPatchParams): Promise<HttpResponse<T>> {
    return BackEndApi.patch<T>(`${this.baseUrl}${url}`, headers, body);
  }

  public static delete<T>({ url, headers }: HttpDeleteParams): Promise<HttpResponse<T>> {
    return BackEndApi.delete<T>(`${this.baseUrl}${url}`, headers);
  }
}

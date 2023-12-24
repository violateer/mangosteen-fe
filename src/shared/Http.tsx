import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export class Http {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL });
  }

  get<ResponseDataType = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "params" | "url" | "method">
  ) {
    return this.instance.request<ResponseDataType>({
      ...config,
      url,
      params: query,
      method: "get",
    });
  }

  // create
  post<ResponseDataType = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<ResponseDataType>({
      ...config,
      url,
      data,
      method: "post",
    });
  }

  // update
  patch<ResponseDataType = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, "url" | "data" | "method">
  ) {
    return this.instance.request<ResponseDataType>({
      ...config,
      url,
      data,
      method: "patch",
    });
  }

  delete<ResponseDataType = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, "url" | "query" | "method">
  ) {
    return this.instance.request<ResponseDataType>({
      ...config,
      url,
      params: query,
      method: "delete",
    });
  }
}

export const http = new Http("/api/v1");

// 拦截器
http.instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 429) {
      alert("请求太频繁！");
    }

    throw error;
  }
);

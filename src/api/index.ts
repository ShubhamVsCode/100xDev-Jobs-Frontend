import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export type ResponseInterface = AxiosResponse | AxiosError;

class ApiClient {
  constructor() {
    this._get = this._get.bind(this);
    this._post = this._post.bind(this);
    this._patch = this._patch.bind(this);
    this._put = this._put.bind(this);
    this._delete = this._delete.bind(this);
  }

  private _getClient(baseURL?: string): AxiosInstance {
    const apiClient = axios.create({
      baseURL: baseURL || process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });
    apiClient.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          if (token && config.headers) {
            const configHeaders = config.headers;
            configHeaders["Access-Control-Allow-Origin"] = "*";
            configHeaders.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (err: AxiosError) => {
        return Promise.reject(err);
      }
    );

    apiClient.interceptors.response.use(
      async (response: AxiosResponse) => {
        return response.data;
      },
      (err: AxiosError) => {
        if (err.response) {
          if (typeof window !== "undefined" && err.response.status === 401) {
            localStorage.removeItem("token");
          }
          return Promise.reject(err.response.data);
        }

        return err;
      }
    );

    return apiClient;
  }

  _get<T>(
    url: string,
    config?: AxiosRequestConfig<unknown>,
    baseURL?: string
  ): Promise<T> {
    const get = this._getClient(baseURL).get(url, config);
    return get as unknown as Promise<T>;
  }

  _post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<unknown>,
    baseURL?: string
  ): Promise<T> {
    const post = this._getClient(baseURL).post(url, data, config);
    return post as unknown as Promise<T>;
  }

  _patch(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<unknown>,
    baseURL?: string
  ): Promise<ResponseInterface> {
    const patch = this._getClient(baseURL).patch(url, data, config);
    return patch as unknown as Promise<ResponseInterface>;
  }

  _put(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<unknown>,
    baseURL?: string
  ): Promise<ResponseInterface> {
    const put = this._getClient(baseURL).put(url, data, config);
    return put as unknown as Promise<ResponseInterface>;
  }

  _delete(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<unknown>,
    baseURL?: string
  ): Promise<ResponseInterface> {
    const configs = { ...config, data };
    const del = this._getClient(baseURL).delete(url, configs);
    return del as unknown as Promise<ResponseInterface>;
  }
}

const Client = new ApiClient();
const get = Client._get;
const post = Client._post;
const patch = Client._patch;
const put = Client._put;
const del = Client._delete;

export { get, post, patch, put, del };

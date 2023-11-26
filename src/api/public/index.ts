import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
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
    const BASE_URL = baseURL || process.env.NEXT_PUBLIC_API_URL;
    const apiClient = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });

    apiClient.interceptors.response.use(
      async (response: AxiosResponse) => {
        return response.data;
      },
      (err: AxiosError) => {
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
const publicGet = Client._get;
const publicPost = Client._post;
const publicPatch = Client._patch;
const publicPut = Client._put;
const publicDel = Client._delete;

export { publicGet, publicPost, publicPatch, publicPut, publicDel };

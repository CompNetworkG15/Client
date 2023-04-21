import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    const { config } = response;
    console.log(config.url, "response", response);
    return response;
  },
  (error) => {
    const { config } = error;
    console.warn(config.url, "error", error);
    return Promise.reject(error);
  }
);

const request = (method, url, params, headers, auth, config) => {
  const req = [axios.post, axios.put, axios.patch, axios.delete].includes(
    method
  )
    ? method(url, params, { ...config, headers, auth }) // POST, PUT, PATCH, DELETE
    : method(url, { ...config, params, headers, auth }); // GET, HEAD, OPTIONS
  return req;
};

const client = {
  get: (
    url: string,
    params = {},
    headers = {},
    auth = undefined,
    config = {}
  ) => request(axios.get, url, params, headers, auth, config),
  post: (
    url: string,
    params = {},
    headers = {},
    auth = undefined,
    config = {}
  ) => request(axios.post, url, params, headers, auth, config),
  put: (
    url: string,
    params = {},
    headers = {},
    auth = undefined,
    config = {}
  ) => request(axios.put, url, params, headers, auth, config),
  patch: (
    url: string,
    params = {},
    headers = {},
    auth = undefined,
    config = {}
  ) => request(axios.patch, url, params, headers, auth, config),
  delete: (
    url: string,
    params = {},
    headers = {},
    auth = undefined,
    config = {}
  ) => request(axios.delete, url, params, headers, auth, config),
  options: (
    url: string,
    params = {},
    headers = {},
    auth = undefined,
    config = {}
  ) => request(axios.options, url, params, headers, auth, config),
};

export default client;

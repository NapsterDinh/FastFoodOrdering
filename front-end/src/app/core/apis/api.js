import axios from "axios";
import configuration, { setApiRequestToken } from "../../../configuration";

const { ApiUrl } = configuration;


const instance = axios.create({
  baseURL: ApiUrl,
  timeout: 30 * 1000,
  headers: {
    "Content-Type": "application/json",
    // "content-type": "multipart/form-data",
  },
});

instance.interceptors.request.use(
  function (config) {
    // console.log('from api.js', config.url);

    const { ApiRequestToken } = configuration;
    console.log(ApiRequestToken)
    if (ApiRequestToken) {
      config.headers.Authorization = `${ApiRequestToken?.access?.token}`;
      return config;
    }
    return config;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use((response) => {
  return response
}, error => {
  console.warn('Error status', error)

  const code = error.response?.status
  const config = error.response?.config
  // const cookies = new Cookies();

  if (code === 401) {
    (async () => {
      const { ApiRequestToken } = configuration;
      const data = await instance.post(`/api/v1/user/refresh`,{refreshToken: ApiRequestToken?.refresh?.token})

      if (data?.data) {
        if (!data?.data?.result) {
          setApiRequestToken('')
          window.location.href = '/login'
          return;
        }

        setApiRequestToken(data?.data?.token)
        // cookies.set('token', data?.data?.token, { path: '/' });

        config.headers = {
          "Content-Type": "application/json",
          "Authorization": `${data?.data?.token?.access?.token}`
        };
        config.baseURL = ApiUrl
        config.timeout = 30 * 1000

        return instance(config)
      }
    })()
  }
})

export const _post = (action, data) => {
  return instance.post(action, data);
};

export const _get = (action, params) => {
  return instance.get(`${action}`, { params });
};

export const _put = (action, params) => {
  return instance.put(`${action}`, params);
};

export const _patch = (action, params) => {
  return instance.patch(`${action}`, params);
};

export const _delete = (action, params) => {
  return instance.delete(`${action}`, { params });
};

export const _getWithToken = (action, token) => {
  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance.get(`${action}`, token);
};

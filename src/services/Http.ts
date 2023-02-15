import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
import { history } from 'umi';
import { Fn, getModelState } from '@/utils/Fn';
import { getDvaApp } from 'umi';

let baseUrl = process.env.API_URL;

const instance = axios.create({
  timeout: 5000, // 超时时间
  baseURL: baseUrl,
});

/** 添加请求拦截器 **/
instance.interceptors.request.use(
  function (config) {
    console.log(getDvaApp());
    if (config.url && config.url?.indexOf('/login') > -1) {
      // 登录接口不校验token
    } else {
      if (
        !Fn.getLocalStorage('userInfo') ||
        (Fn.getLocalStorage('userInfo') &&
          !Fn.getLocalStorage('userInfo').token)
      ) {
        _login();
        return Promise.reject(`请登录`);
      }
    }
    config.headers['uc-token'] = Fn.getLocalStorage('userInfo')
      ? Fn.getLocalStorage('userInfo').token
      : '';
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

/** 添加响应拦截器  **/
instance.interceptors.response.use(
  function (response) {
    if (response.status === 200) {
      if (response.data.status === 1) {
        // 成功
        return response.data.data;
      } else if (response.data.status === -10) {
        // 登录失效
        _login();
        return Promise.reject('登录失效');
      } else {
        // 异常信息
        message.error(`${response.data.message}`);
        return Promise.reject(`${response.data.message}`);
      }
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export const POST = (url: String, params: Object): Promise<any> => {
  return instance.post(`${baseUrl}${url}`, params);
};

export const POSTFile = (url: String, params: any) => {
  let formData = new FormData();
  for (let key in params) {
    formData.append(key, params[key]);
  }
  return instance.post(`${baseUrl}${url}`, formData);
};

export const Get = <T>(url: String, params: Object) => {
  return instance.get(
    `${baseUrl}${url}?${qs.stringify(params)}`,
  ) as unknown as Promise<T>;
};

/**
 * 登录跳转授权链接
 */
function _login() {
  history.push('/login');
}

import * as instance from './Http';
import { isArray } from '@/utils/Fn';

/**
 * 根据授权code获取登录信息
 * @param code 授权code
 * @returns
 */
export const Login = (code: string | string[]) => {
  let param = code;
  if (isArray(code)) {
    param = param[param.length - 1];
  }
  return instance.POST('/login', { code: param });
};

/**
 * 上传文件
 * @param data 文件
 * @returns
 */
export const UploadFile = <T>(data: any) => {
  return instance.POSTFile('/', {
    file: data,
    folder: 'admin',
  }) as unknown as Promise<T>;
};

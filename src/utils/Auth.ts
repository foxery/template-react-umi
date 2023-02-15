import { Fn } from '@/utils/Fn';

/**
 * 检测权限控制、登录状态
 * @returns
 */
function CheckAuth() {
  const isLogin =
    Fn.getLocalStorage('userInfo') && Fn.getLocalStorage('userInfo').token;
  return { isLogin };
}

export { CheckAuth };

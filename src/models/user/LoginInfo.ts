import { Fn } from '@/utils/Fn';

export default {
  namespace: 'login',
  state: {
    info: Fn.getLocalStorage('info') || {
      uid: 0,
      access_token: '',
    },
    userInfo: Fn.getLocalStorage('userInfo') || {
      name: '',
      phone: '',
      token: '',
      username: '',
    },
  },
  //用来保存更新state值，下面的put方法调用这里的方法
  reducers: {
    SAVE_INFO({ state }, { payload }) {
      //这里的state是当前总的state，这里的action包含了下面传递的参数和type
      return { ...state, ...payload };
    },
    SAVE_USER_INFO({ state }, { payload }) {
      //这里的state是当前总的state，这里的action包含了下面传递的参数和type
      return { ...state, ...payload };
    },
  },
  effects: {
    *saveInfo({ payload }, { call, put, select }) {
      Fn.setLocalStorage('info', payload);
      yield put({
        type: 'SAVE_INFO',
        payload: {
          info: payload,
        },
      });
    },
    *saveUserInfo({ payload }, { call, put, select }) {
      Fn.setLocalStorage('userInfo', payload);
      yield put({
        type: 'SAVE_USER_INFO',
        payload: {
          userInfo: payload,
        },
      });
    },
  },
};

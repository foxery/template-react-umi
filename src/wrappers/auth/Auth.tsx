import { Redirect } from 'umi';
import { CheckAuth } from '@/utils/Auth';
import { Fn } from '@/utils/Fn';

export default (props: any) => {
  const { isLogin } = CheckAuth();
  console.log('auth', props);
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    Fn.setLocalStorage('lastRoute', props.location);
    return <Redirect to="/login" />;
  }
};

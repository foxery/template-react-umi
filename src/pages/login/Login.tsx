import React, { useState, useEffect, useRef } from 'react';
import { Fn } from '@/utils/Fn';
import { Login } from '@/services/SystemApi';
import { history, useDispatch } from 'umi';

const LoginView: React.FC<{}> = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
  }, []);

  return <div>正在登录...</div>;
};

export default LoginView;

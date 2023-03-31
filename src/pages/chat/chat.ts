import * as SDK from '@/utils/sdk/NIM_Web_SDK_v8.7.2.js';
import { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'dva';
import { fileTransferToBlob, formatDate } from '@/utils/utils';
import { MsgProp } from './chat.d';

const useChat = () => {
  const dispatch = useDispatch();
  const { sesstionMsgs, nim } = useSelector((state) => state.chat);
  // NIM实例化内的回调函数具有闭包，无法订阅到sesstionMsgs的变化
  // 因此需要ref
  const sesstionMsgsRef = useRef({});
  sesstionMsgsRef.current = sesstionMsgs;

  const onConnect = (event: any) => {
    console.log('onconnect', event);
  };

  const onMsg = (msg: MsgProp) => {
    console.log('onMsg', msg, sesstionMsgsRef.current);
    let chatKey = '';
    let msgType = '';
    if (msg.custom && typeof msg.custom == 'string') {
      msg.custom = JSON.parse(msg.custom);
      chatKey = msg.custom.chat_key;
    }
    switch (msg.type) {
      case 'text':
        msgType = 'txt';
        break;
      case 'image':
        msgType = 'img';
        break;
      default:
        msgType = msg.type;
        break;
    }
    pushMsg(
      msg.type == 'text' ? msg.text : msg.file.url,
      msg.flow,
      msgType,
      formatDate(new Date(msg.time)),
      chatKey,
    );
    dispatch({
      type: 'chat/updateCurrentMsg',
      payload: msg,
    });
  };

  const onSysMsg = (msg: any) => {
    console.log('onSysMsg', msg);
  };

  const initNim = (nimAccount: string, nimToken: string) => {
    let nimTemp = SDK.NIM.getInstance({
      debug: true,
      appKey: '75aed543176ab8b7f0204df3acdd6927',
      account: nimAccount,
      token: nimToken,
      db: false,
      onconnect: (event: any) => onConnect(event),
      onerror: function onError(event: any) {
        //连接失败
        console.log('onerror', event);
      },
      // 消息接收
      onmsg: (msg: any) => onMsg(msg),
      // 系统通知
      onsysmsg: (msg: any) => onSysMsg(msg),
    });
    dispatch({
      type: 'chat/initNim',
      payload: nimTemp,
    });
  };

  /**
   * 追加一条消息
   * @param msg 消息内容
   * @param type 类型 in-接收  out-发送
   * @param msgType 消息类型 txt-文本 image-图片
   * @param time 发送时间文本格式
   * @param chatKey 咨询订单号
   */
  const pushMsg = (
    msg: string,
    type: string,
    msgType: string,
    time: string,
    chatKey: string,
  ) => {
    let sesstionMsgsTemp = JSON.parse(JSON.stringify(sesstionMsgsRef.current));
    let curMsgs = sesstionMsgsTemp[chatKey] || [];
    curMsgs.push({
      msg,
      type,
      msgType,
      time,
      chat_key: chatKey,
    });
    updateSesstion(curMsgs, chatKey);
  };

  /**
   * 更新[所有]云信会话消息
   * @param msgs [当前]会话所有消息数组
   * @param chat_key 当前会话标志-咨询订单号
   */
  const updateSesstion = (msgs: any, chat_key: string) => {
    let sesstionMsgsTemp = JSON.parse(JSON.stringify(sesstionMsgsRef.current));
    sesstionMsgsTemp[chat_key] = msgs;
    dispatch({
      type: 'chat/updateSesstionMsgs',
      payload: sesstionMsgsTemp,
    });
  };

  /**
   * 连接云信
   */
  const connectNim = (nimAccount: string, nimToken: string) => {
    // todo
    // 若无account、token，跳转至登录页
    // 否则
    if (nim) {
      nim.disconnect();
    }
    initNim(nimAccount, nimToken);
  };

  return {
    updateSesstion,
    connectNim,
    pushMsg,
  };
};

export default useChat;

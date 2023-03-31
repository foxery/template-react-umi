import { Button, Col, Input, message, Row, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import SessionItem from './SessionItem';
import './chat.less';
import useChat from './chat';
import { connect, useDispatch, useSelector } from 'dva';
import { SendMsgByServer } from '../../chatService';
import { formatDate } from '@/utils/utils';
import { GetOSSUploadConfig } from '@/services/Api';

interface SessionProps {
  orderid: string;
  patient: { name: string };
}

const Session: React.FC<SessionProps> = (
  props = {
    orderid: '',
    patient: { name: '' },
  },
) => {
  const [txtMsg, setTxtMsg] = useState('');
  const chatContentRef = useRef();

  const { sesstionMsgs, currentMsg } = useSelector((state) => state.chat);
  // 云信
  const chat = useChat();

  useEffect(() => {
    // 对话框滚动到最底部
    if (!chatContentRef.current) {
      return;
    }
    chatContentRef.current.scrollTop = chatContentRef.current?.scrollHeight;
  }, [sesstionMsgs[props.orderid]]);

  useEffect(() => {
    // 对话框滚动到最底部
    if (
      currentMsg.custom.chat_key !== props.orderid ||
      !chatContentRef.current
    ) {
      return;
    }
    chatContentRef.current.scrollTop = chatContentRef.current?.scrollHeight;
  }, [currentMsg]);

  // 输入框输入
  const setInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('setInputValue', e);
    const { value } = e.target;
    setTxtMsg(value);
  };

  /**
   * 发送文本消息
   */
  const onSendText = () => {
    if (!txtMsg) {
      message.success('请输入消息内容');
      return;
    }
    SendMsgByServer(props.orderid, 'txt', txtMsg).then(() => {
      setTxtMsg('');
    });
  };

  // 发送图片/视频消息
  const handleChange: UploadProps['onChange'] = ({ fileList }) => {
    console.log('Aliyun OSS:', fileList);
    if (fileList.length > 0 && fileList[0].status == 'done') {
      let msgType = 'img';
      if (fileList[0].type && fileList[0].type.indexOf('video') > -1) {
        msgType = 'video';
      }
      SendMsgByServer(props.orderid, msgType, fileList[0].fileUrl);
    }
  };

  // 阿里云oss直传上传图片配置
  const uploadProps: UploadProps = {
    ...GetOSSUploadConfig(),
    maxCount: 1,
    showUploadList: false,
    onChange: handleChange,
  };

  return (
    <>
      <div className="chat-content" ref={chatContentRef}>
        {sesstionMsgs[props.orderid]?.map((msg: any, index: number) => {
          return (
            <SessionItem
              msg={msg}
              patient={props.patient}
              key={index}
            ></SessionItem>
          );
        })}
      </div>
      <Row>
        <Col span={3}>
          <Upload {...uploadProps}>
            <Button>图片/视频</Button>
          </Upload>
        </Col>
        <Col span={19}>
          <Input value={txtMsg} onChange={setInputValue}></Input>
        </Col>
        <Col span={2}>
          <Button type="primary" onClick={onSendText}>
            发送
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Session;

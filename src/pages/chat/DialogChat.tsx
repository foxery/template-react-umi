import { Button, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import useChat from './chat';
import Session from './Session';
import {
  GetConsulation,
  CreateConsulation,
  GetHistoryMsgsByServer,
} from '../../chatService';
import type { MsgHistoryRes } from './chat.d';

interface DialogChatProps {
  visible: boolean;
  dialogInfo?: any;
  handleClose?: any;
}

const DialogChat: React.FC<DialogChatProps> = (
  props = {
    visible: false,
    dialogInfo: {
      data: {},
    },
  },
) => {
  const [isModalOpen, setIsModalOpen] = useState(props.visible);
  const [orderid, setOrderid] = useState('');

  // 云信
  const chat = useChat();

  useEffect(() => {
    setIsModalOpen(props.visible);
    if (props.visible) {
      getConsulationOrder();
    }
  }, [props.visible]);

  /**
   * 获取咨询订单号
   */
  const getConsulationOrder = () => {
    GetConsulation(
      props.dialogInfo.data.did,
      props.dialogInfo.data.patient_id,
    ).then((res) => {
      if (res && res.orderid) {
        setOrderid(res.orderid);
        getHistoryMsgs(res.orderid);
      } else {
        CreateConsulation(
          props.dialogInfo.data.did,
          props.dialogInfo.data.patient_id,
          props.dialogInfo.data.uid,
        ).then((resp) => {
          setOrderid(resp.orderid);
        });
      }
    });
  };

  /**
   * 获取历史记录
   */
  const getHistoryMsgs = (orderid: string) => {
    GetHistoryMsgsByServer(orderid).then((res) => {
      let msgs = res.data.map((val: MsgHistoryRes) => {
        return {
          msg: val.type == 'audio' ? val.file_url : val.msg,
          type: val.spokesman == 'u' ? 'in' : 'out',
          msgType: val.type,
          time: val.create_at,
          chat_key: orderid,
        };
      });
      msgs.reverse();
      chat.updateSesstion(msgs, orderid);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    props.handleClose(false);
  };

  return (
    <>
      <Modal
        width={900}
        title={`与${props.dialogInfo.data.realname}沟通`}
        visible={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Session
          orderid={orderid}
          patient={{ name: props.dialogInfo.data.realname }}
        ></Session>
      </Modal>
    </>
  );
};

export default DialogChat;

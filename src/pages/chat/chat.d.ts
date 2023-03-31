declare type MsgProp = {
  scene: string;
  from: string;
  to: string;
  time: number;
  type: string;
  idClient: string;
  idServer: string;
  sessionId: string;
  flow: string;
  [key: string]: any;
};

declare type MsgHistoryRes = {
  contact_name: string;
  create_at: string;
  msg: string;
  type: string;
  spokesman: string;
  file_url: string;
};

export type { MsgProp, MsgHistoryRes };

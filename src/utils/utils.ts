/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

/**
 * 图片地址补全
 * @param url
 * @param type 1补全0去除
 * @returns
 */
export function imgUrlPrefix(url: string = '', type = 1) {
  const prefix = process.env.STATIC_URL + '/';
  let isExist = false;
  // 已存在前缀地址
  isExist = url.indexOf(prefix) != -1;
  if (type == 1) {
    return isExist ? url : prefix + url;
  } else {
    return isExist ? url.split(prefix)[1] : url;
  }
}

/**
 * 递归树
 * @param {*} data 文件名
 * @param {*} pid 父级id
 * @param key
 */
export function tree(data: any, pid = 0, key = 'pid') {
  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const i in data) {
    if (data[i][key] === pid) {
      const temp = data[i];
      const children = tree(data, data[i].id, key);
      if (children.length) {
        temp.children = children;
      }
      result.push(temp);
    }
  }

  return result;
}
/**
 * 格式化日期
 * @param {Date} date
 * @param {String} fmt 'yyyy-MM-dd hh:mm:ss'
 */
export function formatDate(date: Date, fmt: string = 'yyyy-MM-dd hh:mm:ss') {
  const padLeftZero = (str: string) => `00${str}`.substr(str.length);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }
  const o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = `${o[k]}`;
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str),
      );
    }
  }
  return fmt;
}

/** 空字段删除 */
export function emptyFieldClear(obj?: any) {
  if (obj) {
    const data = JSON.parse(JSON.stringify(obj));
    for (const key in data) {
      // 字段值为''、undefined、null时delete删除，不包括boolean类型
      if (
        !data[key] &&
        Object.prototype.toString.call(data[key]) != '[object Boolean]'
      ) {
        delete data[key];
      }
    }
    return data;
  }
  return {};
}

/**
 * @description 格式化金额
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认0位
 * @param decPoint：小数点符号 默认.
 * @param thousandsSep：千分位符号 默认为,
 */
export const formatMoney = (
  number: string | number,
  decimals = 2,
  decPoint = '.',
  thousandsSep = ',',
) => {
  number = `${number}`.replace(/[^0-9+-Ee.]/g, '');
  const n = !isFinite(+number) ? 0 : +number;
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint;
  let s: Array<any> | string = '';
  const toFixedFix = function (n: number, prec: number) {
    const k = Math.pow(10, prec);
    return `${Math.round(n * k) / k}`;
  };
  s = (prec ? toFixedFix(n, prec) : `${Math.round(n)}`).split('.');
  if (thousandsSep) {
    const re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, `$1${sep}$2`);
    }
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
};

/**
 * 获取地址栏参数
 * @param name
 * @param type 1解析字符串 0解析地址栏
 * @param str 需要解析的字符串
 * @returns
 */
export function getUrlParam(name: string, type?: number, str: string = '') {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); // 构造一个含有目标参数的正则表达式对象
  const href = window.location.href;
  const paramsStr = href.split('?')[1] || '';
  const r =
    type == 1
      ? str.substr(Number(str.indexOf('?')) + 1).match(reg)
      : paramsStr.match(reg); // 匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; // 返回参数值
}

/**
 * file文件转blob格式
 * @param file
 */
export function fileTransferToBlob(file: File) {
  return new Promise((resolve, rejct) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      console.log('e就是读取文件返回的对象', e);
      resolve(e.target.result);
    };
  });
}

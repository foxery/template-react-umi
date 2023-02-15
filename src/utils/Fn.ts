import { getDvaApp } from 'umi';

export const Fn = {
  setLocalStorage(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  },
  getLocalStorage(key: string) {
    try {
      let data: any = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  },
  removeAllLocalStorage() {
    try {
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  },
  removeLocalStorage(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },
  saveSessionStorage(key: string, data: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  },
  getSessionStorage(key: string) {
    try {
      let data: any = sessionStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  },
  removeAllSessionStorage() {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.log(error);
    }
  },
  removeSessionStorage(key: any) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  },
};

/**
 * 判断是否是类数组
 * @param   {any}   target      需要判断对象
 * @return  {boolean}           是否类数组
 */
export function isarraylike(target: any) {
  let len = target && target.length;
  return (
    len && 'number' === typeof len && 0 <= len && len <= Math.pow(2, 53) - 1
  );
}

/**
 * 判断是否为数组类型
 * @param {any} target 需要判断对象
 * @returns {boolean}
 */
export function isArray(target: any) {
  return target && typeof target === 'object' && Array == target.constructor;
}

/**
 * 判断对象是否包含某直接属性（非原型）
 * @param   {any}       obj         需要判断对象
 * @param   {string}    key         需要判断对象
 * @return  {boolean}               返回是否存在key值
 */
export function haskey(obj: any, key: string) {
  return obj !== null && obj.prototype.hasOwnProperty(key);
}
/**
 * 判断是否普通对象
 * @param   {any}       target         需要判断对象
 * @return  {boolean}                  返回是否对象
 */
export function isobject(target: any) {
  return typeof target === 'object';
}
/**
 * 获取对象自有属性名（不包含原型属性）
 * @param   {any}       obj              对象
 * @return  {Array}                      返回对象key数组
 */
export function getkeys(obj: any) {
  if (!isobject(obj)) {
    return [];
  }
  if (Object.keys) {
    return Object.keys(obj);
  }
  let keys = [],
    key;
  for (key in obj) {
    if (haskey(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
}
/**
 * 遍历工具，dataset可以是数组和对象
 * 回调函数 handler( item, index|key, dataset)
 * break----用return false
 * continue --用return ture
 * @param   {Object | Array}        dataset                    对象或者数组
 * @param   {Function}              handler                    回调函数
 * @param   {Context}               context                    上下文this
 * @return  {Array}                                            返回对象或数组
 */
export function each(dataset: any, handler: Function, context?: any) {
  let callback =
    'undefined' === typeof context
      ? handler
      : function (value: any, index?: number, collection?: any) {
          return handler.call(context, value, index, collection);
        };
  let i, len, res;
  if (isarraylike(dataset)) {
    //类数组
    i = 0;
    len = dataset.length;
    for (; i < len; i++) {
      res = callback(dataset[i], i, dataset);
      if (false === res) {
        break;
      } else if (true === res) {
        continue;
      }
    }
  } else {
    //键值对象
    let keys = getkeys(dataset);
    i = 0;
    len = keys.length;
    for (; i < len; i++) {
      res = callback(dataset[keys[i]], keys[i], dataset);
      if (false === res) {
        break;
      } else if (true === res) {
        continue;
      }
    }
  }
  return dataset;
}

/**
 * 获取状态管理数据内的state
 * @param namespace 命名空间
 * @returns
 */
export function getModelState(namespace: string) {
  let state = null;
  getDvaApp()._models.forEach((v) => {
    if (v.namespace === namespace) {
      state = v.state;
    }
  });
  return state;
}

/**
 * 获取图片base64
 * @param file 文件
 * @returns
 */
export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

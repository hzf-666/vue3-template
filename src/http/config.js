import axios from 'axios';

const dev = import.meta.env.DEV,
  proxy = {
    '/api': {
      target: dev ? 'http://localhost:6001' : '',
    // rewrite: path => path.replace(/^\/api/, ''),
    },
  };

export function createInstance() {
  return axios.create({
    timeout: 15000, // 超时设置
  });
}

export function getUrl(url) {
  const result = { baseURL: '', url };
  if (!(url && typeof url === 'string')) return result;
  let proxyItem;
  for (const k in proxy) {
    if (url.startsWith(k)) proxyItem = proxy[k];
  }
  if (typeof proxyItem === 'string') {
    result.baseURL = proxyItem;
  } else if (isObj(proxyItem)) {
    proxyItem.rewrite && (result.url = proxyItem.rewrite(url));
    if (typeof proxyItem.target === 'string') result.baseURL = proxyItem.target;
  }
  return result;
}

export function isObj(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}
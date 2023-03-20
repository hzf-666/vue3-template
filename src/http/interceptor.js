const white = {
    token: [],
    httpCount: [],
  },
  { httpCount } = storeToRefs(store.useLayout());

export default function(axios) {
  axios.interceptors.request.use(req => {
    const token = cache().get('token');
    if (token && !isWhite(req.url, white.token)) { // 拦截并添加 token 认证
      req.headers.Authorization = token;
    }
    req.headers['Cache-Control'] = 'no-cache';
    req.headers.Pragma = 'no-cache';

    if (!isWhite(req.url, white.httpCount)) {
      new Promise((resolve, reject) => {
        req.cancelHttpCount = reject;
        setTimeout(() => {
          resolve();
        }, 100);
      }).then(() => {
        delete req.cancelHttpCount;
        setHttpCount();
      }).catch(() => {});
    }

    return req;
  }, err => {
    return Promise.reject(err);
  });

  axios.interceptors.response.use(res => {
    handleHttpCount(res);
    return res;
  }, err => {
    handleHttpCount(err);
    return Promise.reject(err);
  });
}

function setHttpCount(finished = false) {
  if (finished) {
    if (httpCount.value > 0) httpCount.value--;
  } else {
    httpCount.value++;
  }
}

function handleHttpCount(res) {
  const { url, cancelHttpCount } = res.config;
  if (isWhite(url, white.httpCount)) return;
  if (cancelHttpCount) {
    cancelHttpCount();
  } else {
    setHttpCount(true);
  }
}

const baseUrl = '/api';

export function getApiList(options, config) { // 接口 - 列表
  config = { ...config, tipOptions: {
    success: '',
    fail: '',
    ...config?.tipOptions,
  } };
  return http.get([`${ baseUrl }`, options], config);
}

export function getApiTree(options, config) { // 接口 - 树形
  config = { ...config, tipOptions: {
    success: '',
    fail: '',
    ...config?.tipOptions,
  } };
  return http.get([`${ baseUrl }/tree`, options], config);
}

export function editApiState(id, options, config) { // 接口 - 修改状态
  config = { ...config, tipOptions: {
    success: '修改成功',
    fail: '',
    ...config?.tipOptions,
  } };
  return http.put([`${ baseUrl }/state/${ id }`, options], config);
}

export function deleteApi(id, options, config) { // 接口 - 删除
  config = { ...config, tipOptions: {
    success: '删除成功',
    fail: '',
    ...config?.tipOptions,
  } };
  return http.delete([`${ baseUrl }/${ id }`, options], config);
}

export function addApi(options, config) { // 接口 - 新增
  config = { ...config, tipOptions: {
    success: '新增成功',
    fail: '',
    ...config?.tipOptions,
  } };
  return http.post([`${ baseUrl }`, options], config);
}

export function editApi(id, options, config) { // 接口 - 修改
  config = { ...config, tipOptions: {
    success: '修改成功',
    fail: '',
    ...config?.tipOptions,
  } };
  return http.put([`${ baseUrl }/${ id }`, options], config);
}

export function getApiDetail(id, options, config) { // 接口 - 详情
  config = { ...config, tipOptions: {
    success: '',
    fail: '',
    ...config?.tipOptions,
  } };
  return http.get([`${ baseUrl }/${ id }`, options], config);
}

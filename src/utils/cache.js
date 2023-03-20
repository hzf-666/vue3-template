export default function(type) {
  let cache = {
    getItem() {},
    setItem() {},
    removeItem() {},
    clear() {},
  };
  switch (type) {
    default:
    case 'session':
      cache = sessionStorage;
      break;
    case 'local':
      cache = localStorage;
      break;
  }
  return {
    get: (key) => cache.getItem(key),
    set: (key, value) => void cache.setItem(key, value),
    remove: (key) => void cache.removeItem(key),
    clear: () => void cache.clear(),
  };
}

export function useListener() {
  const listeners = [];
  const add = (event, ...args) => {
    listeners.push({ event, args });
    window.addEventListener(event, ...args);
  };
  const remove = (event, ...args) => window.removeEventListener(event, ...args);
  onUnmounted(() => {
    listeners.forEach(({ event, args }) => {
      remove(event, ...args);
    });
  });
  return { add, remove };
}

export function useTimer() {
  const timers = [];
  const add = (interval, ...args) => {
    const timer = (interval ? setInterval : setTimeout)(...args);
    timers.push({ interval, timer });
    return timer;
  };
  const clear = (interval, timer) => timer && (interval ? clearInterval : clearTimeout)(timer);
  onBeforeUnmount(() => {
    timers.forEach(({ interval, timer }) => {
      clear(interval, timer);
    });
  });
  return { add, clear };
}

export const useCompName = () => getCurrentInstance().proxy.$options.name;

export function usePage(callback) {
  const compName = useCompName(), { keepAliveMap } = storeToRefs(store.useLayout()), target = keepAliveMap.value[compName];

  if (!(compName && target)) {
    callback && callback(true);
    return;
  }

  target.activated = false;

  onActivated(() => {
    callback && callback(!target.activated);
    target.activated = true;
  });
}

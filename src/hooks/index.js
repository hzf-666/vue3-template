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

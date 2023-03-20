export default storeName => defineStore(storeName, {
  state: () => ({
    isMobile: false,
    httpCount: 0,
    keepAliveMap: {},
  }),
  getters: {
  },
  actions: {
    removeAlives(names = []) {
      const newKeepAliveMap = deepCopy(this.keepAliveMap);
      names.forEach(name => {
        delete newKeepAliveMap[name];
      });
      this.keepAliveMap = newKeepAliveMap;
    },
    resetAlives(names = []) {
      names.forEach(name => {
        if (this.keepAliveMap[name]) {
          this.keepAliveMap[name].key = name + Date.now();
          this.keepAliveMap[name].activated = false;
        }
      });
    },
    initActivated(names = []) {
      names.forEach(name => {
        if (this.keepAliveMap[name]) this.keepAliveMap[name].activated = false;
      });
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['keepAliveMap'],
  },
});

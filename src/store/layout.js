const initialPaths = ['keepAliveMap'];

export default storeName => defineStore(storeName, {
  state: () => ({
    isMobile: false,
    httpCount: 0,
    keepAliveMap: {},
  }),
  getters: {
  },
  actions: {
    init() {
      this.$reset();
      const obj = JSON.parse(cache().get(storeName));
      initialPaths.forEach(item => {
        delete obj[item];
      });
      cache().set(storeName, JSON.stringify(obj));
    },
    removeAlives(names = []) {
      names.forEach(name => {
        delete this.keepAliveMap[name];
      });
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
    paths: [...initialPaths],
  },
});

import { createPersistedState } from 'pinia-plugin-persistedstate';

const modules = import.meta.glob(['./*.js'], { eager: true });

const store = {}, pinia = createPinia(), storage = sessionStorage;

for (const path in modules) {
  const name = path.replace(/\.\/(.*)\.js/, '$1'), mod = modules[path];
  if (mod.default) {
    store[`use${ name[0].toUpperCase() }${ name.substring(1) }`] = mod.default(name, storage);
  }
}
pinia.use(
  createPersistedState({
    storage,
  })
);

export { store, pinia };

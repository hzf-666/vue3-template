const modules = import.meta.glob([
    './svg-icon.js',
    './vconsole.js',
  ], { eager: true }),
  plugins = [];

for (const path in modules) {
  const mod = modules[path];
  if (mod.default) {
    plugins.push(mod.default);
  }
}

export default plugins;

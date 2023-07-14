const modules = import.meta.glob(['./*.js', './*/index.js'], { eager: true });

export default function(app) {
  for (const path in modules) {
    const reg = /\.\/(.*)\/index\.js/, name = path.replace(reg.test(path) ? reg : /\.\/(.*)\.js/, '$1'), mod = modules[path];
    if (mod.default) {
      app.directive(name, mod.default(name));
    }
  }
}

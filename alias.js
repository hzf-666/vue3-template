import path from 'path';

export function resolve(dir) {
  return path.resolve(__dirname, dir);
}

const alias = {
  '@': 'src',
  '@a': 'src/assets',
  '@c': 'src/components',
  '@d': 'src/directives',
  '@h': 'src/hooks',
  '@p': 'src/plugins',
  '@u': 'src/utils',
  '@v': 'src/views',
};

export function getAlias(fn) {
  const result = {};
  for (const k in alias) {
    result[k] = fn(alias[k]);
  }
  return result;
}

export function resolveStatic(path) {
  const pathArr = path.split('/'), prefix = alias[pathArr[0]];
  if (prefix) pathArr[0] = prefix;
  return new URL(pathArr.join('/'), import.meta.url).href;
}

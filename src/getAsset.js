const assets = import.meta.glob(['/src/assets/image/**/*'], { eager: true });
const staticMap = {};

for (const k in assets) {
  staticMap[k.replace('/src/assets/', '')] = assets[k].default;
}

export default function(path) {
  return staticMap[path];
}

import { pinia } from './store';
import 'normalize.css';
import 'animate.css';
import directives from './directives';
import * as utils from './utils';
import plugins from './plugins';

const App = defineAsyncComponent(() => import('./App.vue')), app = createApp(App);
app.use(pinia);
directives(app);

[utils].forEach(item => {
  for (const k in item) {
    app.config.globalProperties[`$${ k }`] = item[k];
  }
});

(async function() {
  await Promise.all(plugins.map(plugin => plugin(app)));
  import('./scss/index.scss');

  const { default: router } = await import('./router');
  app.use(router);

  const http = await import('./http');
  app.config.globalProperties.$http = http.default;

  const getAsset = await import('./getAsset.js');
  app.config.globalProperties.$getAsset = getAsset.default;

  app.mount('#app');
})();

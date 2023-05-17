import { defineAsyncComponent, createApp } from 'vue';
import { pinia } from './store';
import 'normalize.css';
import 'animate.css';
import './scss/index.scss';
import plugins from './plugins';
import directives from './directives';

const App = defineAsyncComponent(() => import('./App.vue')), app = createApp(App);
app.use(pinia);
directives(app);

(async function() {
  await Promise.all(plugins.map(plugin => plugin(app)));

  const { default: router } = await import('./router');
  app.use(router);

  const http = await import('./http');
  app.config.globalProperties.$http = http.default;

  const utils = await import('./utils');
  for (const k in utils) {
    app.config.globalProperties[`$${ k }`] = utils[k];
  }

  app.mount('#app');
})();

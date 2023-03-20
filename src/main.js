import { createApp } from 'vue';
import App from './App.vue';
import 'normalize.css';
import 'animate.css';
import './scss/index.scss';
import * as utils from './utils';
import plugins from './plugins';
import directives from './directives';

const app = createApp(App);

for (const k in utils) {
  app.config.globalProperties[`$${ k }`] = utils[k];
}

(async function() {
  await Promise.all(plugins.map(plugin => plugin(app)));
  directives(app);

  await import('./store').then(async({ default: store }) => {
    app.use(store);
    const { default: router } = await import('./router');
    app.use(router);
    const http = await import('./http');
    app.config.globalProperties.$http = http.default;
  });

  app.mount('#app');
})();

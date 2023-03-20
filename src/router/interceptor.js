import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

export default function(router) {
  router.beforeEach(async(to, from) => { // 全局前置守卫
    NProgress.start();
    document.title = to.meta.title;
  });

  router.afterEach(async() => { // 全局后置钩子
    NProgress.done();
  });

  return router;
}

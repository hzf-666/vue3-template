import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import autoImport from 'unplugin-auto-import/vite';
import vueComponents from 'unplugin-vue-components/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import postcssRelaxedUnit from 'postcss-relaxed-unit';
import * as hooks from './src/hooks';
import * as utils from './src/utils';

const autoDirs = {
  hooks: Object.keys(hooks),
  utils: Object.keys(utils),
};

const fontSizeScale = 100;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const dev = mode === 'development', env = loadEnv(mode, process.cwd()),
    resolve = dir => path.resolve(__dirname, dir),
    outDir = 'dist';

  return {
    define: {
      fontSizeScale,
      responsive: true,
      vconsole: true,
    },
    server: {
      host: env.VITE_HOST,
      port: env.VITE_PORT,
    },
    base: dev ? '/' : `/${ outDir }/`,
    build: {
      outDir,
      assetsDir: 'static',
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        '@a': resolve('src/assets'),
        '@c': resolve('src/components'),
        '@d': resolve('src/directives'),
        '@h': resolve('src/hooks'),
        '@p': resolve('src/plugins'),
        '@u': resolve('src/utils'),
        '@v': resolve('src/views'),
      }
    },
    plugins: [
      vue(),
      vueSetupExtend(),
      autoImport({
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', {
          vue: ['defineEmits', 'defineExpose', 'defineProps'],
        }],
        resolvers: [
          name => {
            for (const k in autoDirs) {
              if (autoDirs[k].includes(name)) {
                return { from: `@/${ k }`, name };
              }
            }
            if (name === 'http') {
              return { from: '@/http', name: 'default' };
            }
            if (name === 'store') {
              return { from: '@/store', name };
            }
          },
        ],
      }),
      vueComponents(),
      createSvgIconsPlugin({
        iconDirs: [ // 指定需要缓存的图标文件夹
          resolve('src/assets/iconsvg'),
        ],
        symbolId: 'icon-[dir]-[name]', // 指定 symbolId 格式
        svgoOptions: {
          plugins: [
            {
              name: 'removeAttrs',
              params: {
                attrs: '(fill|stroke)'
              },
            },
          ],
        },
      }),
    ],
    css: {
      preprocessorOptions: { // css 预处理器
        scss: {
          charset: false,
          additionalData: '@use "sass:math"; @import "src/scss/variate.scss";',
        },
      },
      postcss: {
        plugins: [
          postcssRelaxedUnit({
            rules: {
              rx: `div(${ fontSizeScale }).unit(rem)`,
            },
          }),
        ],
      },
    },
  };
});

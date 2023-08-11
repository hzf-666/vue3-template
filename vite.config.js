import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import vueComponents from 'unplugin-vue-components/vite';
import autoImport from 'unplugin-auto-import/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import postcssRelaxedUnit from 'postcss-relaxed-unit';
import * as hooks from './src/hooks';
import * as utils from './src/utils';

const resolve = dir => path.resolve(__dirname, dir);

const autoDirs = {
  hooks: Object.keys(hooks),
  utils: Object.keys(utils),
};

const fontSizeScale = 100;

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const outDir = 'dist', assetsDir = 'static';
  const prod = command === 'build', base = prod ? `/${ outDir }/` : '/';

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
    base,
    build: {
      outDir,
      assetsDir,
      chunkSizeWarningLimit: 500,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: `${ assetsDir }/js/entry-[name]-[hash].js`,
          chunkFileNames: `${ assetsDir }/js/chunk-[name]-[hash].js`,
          assetFileNames: `${ assetsDir }/[ext]/[name]-[hash].[ext]`,
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const modulePath = id.split('node_modules/')[1].split('/'), moduleName = modulePath[0];
              return moduleName;
            }
          },
        },
      },
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
      },
    },
    plugins: [
      vue(),
      vueSetupExtend(),
      vueComponents(),
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
            if (name === 'getAsset') {
              return { from: '@/getAsset', name: 'default' };
            }
          },
        ],
      }),
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

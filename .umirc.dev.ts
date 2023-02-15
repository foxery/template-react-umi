import { defineConfig } from 'umi';
import IndexRoutes from './src/routes/Index';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  routes: [...IndexRoutes],
  fastRefresh: {},
  request: {
    dataField: 'data',
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   },
  // },
  define: {
    'process.env': {
      API_URL: '',
    },
  },
});

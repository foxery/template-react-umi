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
  define: {
    'process.env': {
      API_URL: '',
    },
  },
});

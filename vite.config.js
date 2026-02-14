// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 8080,
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    envPrefix: 'APP_',
    server: {
      port: 8080,
    },

    base: '/',
    build: {
      outDir:
        mode === 'production'
          ? 'dist/prod_build'
          : mode === 'development'
            ? 'dist/dev_build'
            : mode === 'qa'
              ? 'dist/qa_build'
              : 'dist/uat_build',
    },
  };
});

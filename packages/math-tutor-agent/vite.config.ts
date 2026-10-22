import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    ssr: 'src/main.ts',
    target: 'node18',
    sourcemap: true,
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
      },
    },
  },
  ssr: {
    // The shared protocol package ships TypeScript sources, so it must be bundled
    // instead of being externalized as a runtime import.
    noExternal: ['@tutorials-maker/math-tutor-protocol'],
  },
});

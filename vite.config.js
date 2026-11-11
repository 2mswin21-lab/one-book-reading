import { defineConfig } from 'vite';

// The original design uses pixel-sized type. Scale those font sizes centrally
// while keeping the layout adjustments in large-text.css explicit.
const doubleText = {
  postcssPlugin: 'double-readable-fonts',
  Once(root) {
    if (root.source?.input?.file?.endsWith('large-text.css')) return;
    root.walkDecls(/^(font|font-size)$/, (declaration) => {
      declaration.value = declaration.value.replace(/(\d*\.?\d+)px/, (_, size) => `${Number(size) * 2}px`);
    });
  },
};

export default defineConfig({
  base: '/one-book-reading/',
  css: { postcss: { plugins: [doubleText] } },
});

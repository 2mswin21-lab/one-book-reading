import { defineConfig } from 'vite';

// Halve the previous size: base styles were at 1.5x and layout overrides
// were at 0.75x their declared size. Scale responsive clamp() values too.
const readableText = {
  postcssPlugin: 'scale-readable-fonts',
  Once(root) {
    const factor = root.source?.input?.file?.endsWith('large-text.css') ? 0.375 : 0.75;
    root.walkDecls(/^(font|font-size)$/, (declaration) => {
      declaration.value = declaration.value.replace(/(\d*\.?\d+)(px|vw)/g, (_, size, unit) => `${Number(size) * factor}${unit}`);
    });
  },
};

export default defineConfig({
  base: '/one-book-reading/',
  css: { postcss: { plugins: [readableText] } },
});

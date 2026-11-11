import { defineConfig } from 'vite';

// Original styles were doubled; use 75% of that size (1.5x the original).
// The later layout overrides were written at the doubled size, so scale those
// by 75% as well, including both bounds of responsive clamp() values.
const readableText = {
  postcssPlugin: 'scale-readable-fonts',
  Once(root) {
    const factor = root.source?.input?.file?.endsWith('large-text.css') ? 0.75 : 1.5;
    root.walkDecls(/^(font|font-size)$/, (declaration) => {
      declaration.value = declaration.value.replace(/(\d*\.?\d+)(px|vw)/g, (_, size, unit) => `${Number(size) * factor}${unit}`);
    });
  },
};

export default defineConfig({
  base: '/one-book-reading/',
  css: { postcss: { plugins: [readableText] } },
});

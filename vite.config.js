import { defineConfig } from 'vite';

// Double the previous size: base styles were at 0.75x and layout overrides
// were at 0.375x their declared size. Scale responsive clamp() values too.
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

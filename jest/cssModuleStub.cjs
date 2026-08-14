/**
 * A stub for a CSS module import inside a Jest test.
 *
 * PostCSS builds the real class names, and Jest cannot read a .css file. The
 * stub returns the key name for every class, so a rendered component keeps a
 * stable class name. jest.config.ts maps every *.module.css import here. The
 * .cjs extension keeps ts-jest from compiling this file.
 */
module.exports = new Proxy(
  {},
  {
    get: (target, key) => {
      if (key === "__esModule") {
        return false;
      }

      return String(key);
    },
  },
);

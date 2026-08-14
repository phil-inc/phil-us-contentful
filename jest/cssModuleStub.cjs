/**
 * A stub for a CSS module import inside a Jest test.
 *
 * PostCSS builds the real class names, and Jest cannot read a .css file. The
 * stub returns the key name for every class, so a rendered component keeps a
 * stable class name. jest.config.ts maps every *.module.css import here. The
 * .cjs extension keeps ts-jest from compiling this file.
 *
 * The stub reports __esModule: true. Every source file reads a CSS module with
 * "import * as classes", which ts-jest compiles to a __importStar call. That
 * helper copies the own properties of a CommonJS export, and a Proxy over an
 * empty object owns no property, so a false value gives every class the value
 * undefined. A true value makes the helper pass this Proxy through untouched,
 * so each class lookup reaches the get trap below.
 */
const stub = new Proxy(
  {},
  {
    get: (target, key) => {
      if (key === "__esModule") {
        return true;
      }

      // React and Jest probe a rendered value with a well known symbol, such as
      // Symbol.toPrimitive. A symbol key is not a class name, so return nothing.
      if (typeof key === "symbol") {
        return undefined;
      }

      // A default import of a CSS module reads the same class name map.
      if (key === "default") {
        return stub;
      }

      return key;
    },
  },
);

module.exports = stub;

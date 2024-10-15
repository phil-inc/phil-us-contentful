/**
 * GetWindowProperty - Return the browsers window object if it is defined or return the defaultValue provided.
 * @template T
 * @param {string} path - The path of the property to be retrieved from the window object.
 * @param {T} defaultValue - The default value to return if the property is not found or if the window object is not defined.
 * @returns {T} - The value of the property at the given path or the default value.
 */
export const getWindowProperty = <T>(path: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    let object: any = window;
    const properties = path.split(".");
    for (const prop of properties) {
      if (prop in object) {
        object = object[prop] as unknown;
      } else {
        return defaultValue;
      }
    }

    return object as T;
  }

  return defaultValue;
};

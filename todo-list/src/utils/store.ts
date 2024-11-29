const setStore = (items: any[], name: string): void => {
  if (items) {
    const stringified = JSON.stringify(items);
    localStorage.setItem(name, stringified);
  } else {
    localStorage.setItem(name, "[]");
  }
};

/**
 * 
 * @param name the name of the object stored in local storage
 * @returns a array based on the passed type
 */
const readStore = <T>(name: string): T[] => {
  const stringified = localStorage.getItem(name);
  if (stringified) {
    const todos: T[] = JSON.parse(stringified);
    return todos;
  }
  return [];
};

export { setStore, readStore };

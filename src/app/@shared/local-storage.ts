export class LocalStorage {
  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }

  static has(key: string) {
    return localStorage.hasOwnProperty(key);
  }

  static keys() {
    return Object.keys(localStorage);
  }
}

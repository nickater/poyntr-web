
type StorageService = {
  setItem(key: string, value: string): void;
  getItem(key: string): string | null;
  removeItem(key: string): void;
}

const storageService: StorageService = {
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  },
  getItem(key: string) {
    return localStorage.getItem(key);
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};

export default storageService;

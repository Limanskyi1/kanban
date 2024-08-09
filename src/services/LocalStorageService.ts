class LocalStorageService {
    setItem(key:string, value:any) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            console.error(`${error}`);
        }
    }
    getItem(key:string) {
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) {
                return null;
            }
            return JSON.parse(serializedValue);
        } catch (error) {
            console.error(`${error}`);
            return null;
        }
    }

    removeItem(key:string) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`${error}`);
        }
    }
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error(`${error}`);
        }
    }
}

export const localStorageServive = new LocalStorageService();

class Store{
    setItemToLocalStorage(key: string, value: string){
        localStorage.setItem(key, value);
    }
    getItemFromLocalStorage(key: string){
        localStorage.getItem(key);
    }
    removeItemFromLocalStorage(key: string){
        localStorage.removeItem(key);
    }
}

export default new Store();
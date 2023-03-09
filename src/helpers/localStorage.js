const getStorageItem = (key) => {
    const value = localStorage.getItem(key);
    return value && JSON.parse(value);
  };
  
  const setStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  export const addItemToStorage = (key, value) => {
    const oldValue = getStorageItem(key) || [];
    const newValue = Array.isArray(oldValue)
      ? [...(oldValue || []), value]
      : { ...(oldValue || {}), ...value };
    setStorageItem(key, newValue);
  };
  
  export const removeItemFromStorage = (key, itemToRemove) => {
    const oldValue = getStorageItem(key) || [];
    let newValue;
    if (Array.isArray(oldValue)) {
      newValue = oldValue.filter((item) => item.id !== itemToRemove.id);
    } else if (typeof oldValue === 'object' && oldValue !== null) {
      newValue = { ...oldValue };
      delete newValue[itemToRemove];
    } else {
      console.log(`Invalid localStorage value for key '${key}'`);
      return;
    }
    setStorageItem(key, newValue);
  };
  
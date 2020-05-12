export const saveLocalStorage = (data, key) => {
  // Stringify Data
  const dataString = JSON.stringify(data);

  localStorage.setItem(key, dataString);
};

export const getLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteLocalStorage = key => {
  localStorage.removeItem(key);
};

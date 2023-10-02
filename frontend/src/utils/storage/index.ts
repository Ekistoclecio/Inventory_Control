// Função responsável por "pegar" valores do localStorage a partir de uma chave (key).
export function getToStorage(key: string) {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Função responsável por definir valores no localStorage a partir de uma chave (key) e um valor.
export function setToStorage(key: string, value: any) {
  try {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);
    return value;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Função responsável por excluir valores do localStorage a partir de uma chave (key).
export function deleteDoStorage(key: string) {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      localStorage.removeItem(key);
      return JSON.parse(item);
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

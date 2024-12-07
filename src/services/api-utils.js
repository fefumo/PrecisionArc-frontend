export const getTokenFromLocalStorage = () => localStorage.getItem('token') || null;
export const setTokenToLocalStorage = (token) => localStorage.setItem('token', token);
export const clearTokenFromLocalStorage = () => localStorage.removeItem('token');
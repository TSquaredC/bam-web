import apiFetch from "./api";

export const login = (credentials) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const register = (payload) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const logout = () => Promise.resolve();

export default {
  login,
  register,
  logout,
};

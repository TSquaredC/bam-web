const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const buildUrl = (path) => {
  if (!path) return API_BASE_URL;
  if (path.startsWith("http")) return path;
  return `${API_BASE_URL}${path}`;
};

export const apiFetch = async (path, options = {}) => {
  const response = await fetch(buildUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  if (response.status === 204) return null;
  return response.json();
};

export default apiFetch;

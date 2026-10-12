
const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.title ||
        `Request failed (${response.status})`
    );
  }

  return data;
}

async function furnitureRequest(url, options = {}) {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(options.body && !isFormData
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  return handleResponse(response);
}

export async function getAllFurniture() {
  const response = await fetch(`${API_URL}/Furniture`);

  return handleResponse(response);
}

export async function getFurnitureById(id) {
  return furnitureRequest(`/Furniture/${id}`);
}

export async function searchFurniture({
  search = "",
  categoryId = "",
  minPrice = "",
  maxPrice = "",
}) {
  const params = new URLSearchParams();

  if (search.trim()) params.append("search", search.trim());
  if (categoryId) params.append("categoryId", categoryId);
  if (minPrice !== "") params.append("minPrice", minPrice);
  if (maxPrice !== "") params.append("maxPrice", maxPrice);

  return furnitureRequest(
    `/Furniture/search?${params.toString()}`
  );
}

export async function createFurniture(formData) {
  return furnitureRequest("/Furniture", {
    method: "POST",
    body: formData,
  });
}

export async function updateFurniture(id, furniture) {
  return furnitureRequest(`/Furniture/${id}`, {
    method: "PUT",
    body: JSON.stringify(furniture),
  });
}

export async function deleteFurniture(id) {
  return furnitureRequest(`/Furniture/${id}`, {
    method: "DELETE",
  });
}

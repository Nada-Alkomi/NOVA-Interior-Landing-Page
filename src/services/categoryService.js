
const API_URL =
  import.meta.env.VITE_API_URL || "https://localhost:7109/api";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed (${response.status})`
    );
  }

  return data;
}

export async function getAllCategories() {
  const response = await fetch(`${API_URL}/Category`);
  return handleResponse(response);
}

export async function createCategory(category) {
  const response = await fetch(`${API_URL}/Category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });

  return handleResponse(response);
}

export async function updateCategory(id, category) {
  const response = await fetch(`${API_URL}/Category/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });

  return handleResponse(response);
}

export async function deleteCategory(id) {
  const response = await fetch(`${API_URL}/Category/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

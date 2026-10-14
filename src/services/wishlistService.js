
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

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

export async function getWishlist(userId) {
  const response = await fetch(
    `${API_URL}/Wishlist/user/${userId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

export async function addToWishlist(userId, furnitureId) {
  const response = await fetch(`${API_URL}/Wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      userId: Number(userId),
      furnitureId: Number(furnitureId),
    }),
  });

  return handleResponse(response);
}

export async function removeFromWishlist(userId, furnitureId) {
  const response = await fetch(
    `${API_URL}/Wishlist/user/${userId}/furniture/${furnitureId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

/**
 * Simple API layer for Fake Store products using Fetch API.
 * Throws on non-OK responses to enable explicit error handling.
 */
const BASE = "https://fakestoreapi.com";

export async function fetchProducts() {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

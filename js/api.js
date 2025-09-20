// frontend/js/api.js
const API_BASE = "https://surgipharmamarket-backend.onrender.com/api";

/**
 * Generic API Request helper
 */
async function apiRequest(endpoint, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = "Bearer " + token;

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// ----------------------------
// AUTH & USER
// ----------------------------
async function registerBuyer(data) {
  return apiRequest("/buyers/register", "POST", data);
}

async function registerSeller(data) {
  return apiRequest("/sellers/register", "POST", data);
}

async function login(data) {
  return apiRequest("/auth/login", "POST", data);
}

// ----------------------------
// PRODUCTS
// ----------------------------
async function addProduct(data, token) {
  return apiRequest("/products", "POST", data, token);
}

async function fetchProducts() {
  return apiRequest("/products", "GET");
}

// ----------------------------
// ORDERS
// ----------------------------
async function placeOrder(data, token) {
  return apiRequest("/orders", "POST", data, token);
}

async function fetchOrders(token) {
  return apiRequest("/orders", "GET", null, token);
}

// ----------------------------
// TOKEN STORAGE
// ----------------------------
function saveToken(token, role) {
  localStorage.setItem("jwt", token);
  localStorage.setItem("role", role);
}

function getToken() {
  return localStorage.getItem("jwt");
}

function clearToken() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("role");
}

function getRole() {
  return localStorage.getItem("role");
}

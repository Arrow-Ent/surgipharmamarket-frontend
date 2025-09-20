const API_BASE = "https://surgipharmamarket-backend.onrender.com";

function _tokenKey() { return 'sp_token'; }

async function apiRequest(endpoint, opts) {
  opts = opts || {};
  const method = opts.method || 'GET';
  const headers = { 'Content-Type': 'application/json' };
  if(opts.auth){ const t = localStorage.getItem(_tokenKey()); if(t) headers['Authorization'] = 'Bearer ' + t; }
  const res = await fetch((API_BASE||'') + endpoint, { method, headers, body: opts.body ? JSON.stringify(opts.body) : undefined });
  let data = null;
  try { data = await res.json(); } catch(e) { data = null; }
  if(!res.ok) throw data || { error: 'Request failed' };
  return data;
}

function saveToken(token) { localStorage.setItem(_tokenKey(), token); }
function clearToken() { localStorage.removeItem(_tokenKey()); localStorage.removeItem('sp_user'); }
function saveUser(user) { localStorage.setItem('sp_user', JSON.stringify(user)); }
function getUser() { const u = localStorage.getItem('sp_user'); if(!u) return null; try{ return JSON.parse(u); }catch(e){ return null; } }

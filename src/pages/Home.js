import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', stock: '', sellerId: 'seller_demo' });

  useEffect(() => {
    api.get('/api/products').then(res => setProducts(res.data.products || [])).catch(()=>{});
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    await api.post('/api/products', payload);
    const res = await api.get('/api/products');
    setProducts(res.data.products || []);
  };

  const copyFirst = async () => {
    if (!products.length) return;
    const pid = products[0]._id;
    await api.post(`/api/products/${pid}/copy`, { sellerId: 'seller_copy', price: products[0].price, stock: products[0].stock });
    const res = await api.get('/api/products');
    setProducts(res.data.products || []);
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={copyFirst}>Copy first product (demo)</button>
      <ul>
        {products.map(p => (
          <li key={p._id}>{p.name} — ₹{p.price} — stock {p.stock} — seller {p.sellerId}</li>
        ))}
      </ul>
      <h3>Add Product (demo)</h3>
      <form onSubmit={addProduct}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
        <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required />
        <input placeholder="Stock" type="number" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

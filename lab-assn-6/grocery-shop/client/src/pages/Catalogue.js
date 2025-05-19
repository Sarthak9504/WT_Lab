import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Catalogue() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(() => alert('Failed to load products'));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Product Catalogue</h2>
      {products.map(product => (
        <div key={product.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h4>{product.name}</h4>
          <img src={product.image} alt={product.name} width="100" /><br />
          <strong>Price: ${product.cost}</strong>
        </div>
      ))}
    </div>
  );
}

export default Catalogue;
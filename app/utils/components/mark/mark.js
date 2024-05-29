// src/components/ProductsPage.js
'use client';

import React, { useState, useEffect } from 'react';
import './mark.css';

const productList = [
  { _id: '1', name: 'Product 1', description: 'Description for product 1', price: 10.99 },
  { _id: '2', name: 'Product 2', description: 'Description for product 2', price: 20.99 },
  { _id: '3', name: 'Product 3', description: 'Description for product 3', price: 30.99 },
  // Add more products as needed
];

function Product({ product, onAddToCart }) {
  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Instead of fetching products, we use the static list
    setProducts(productList);
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <h1>Products</h1>
      <div className="products-list">
        {products.map((product) => (
          <Product key={product._id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.map((item, index) => (
          <div key={index}>{item.name} - ${item.price}</div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;

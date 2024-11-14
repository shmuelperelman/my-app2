"use client";  

import { useState, useEffect } from "react";
import { getProductById } from "@/utils/functions/apiCalls";
import Image from "next/image";
import "./market1.css";
import ChatBox from "@/utils/components/ChatBox/ChatBox";

export default function ProductPage({ params: { id } }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];

        if (!token) {
          throw new Error("Authentication token is missing.");
        }

        const productData = await getProductById(id, token);

        if (!productData) {
          throw new Error("Product not found.");
        }

        setProduct(productData);
      } catch (error) {
        console.error("Error loading product:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Failed to load product details. Please try again later.</p>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="image-container">
        <Image
          src={product.imageUrl || '/placeholder-image.jpg'} 
          alt={product.name || 'Product Image'}
          width={500}
          height={500}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
        <div className="product-info">
          <h1>{product.name || 'Unnamed Product'}</h1> 
          <p>{product.price ? `${product.price} ₪` : 'Price not available'}</p>
          <p>{product.description || 'No description available'}</p>
        </div>
      </div>
      <div className="chat-box-container">
        <ChatBox recipientId={product.userId} />
      </div>
    </div>
  );
}

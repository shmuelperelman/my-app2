"use client"
import { useState } from 'react';
import { TextField } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/utils/services/firebase';
import { getCookie } from 'cookies-next';
import { createNewProduct } from '../../functions/apiCalls';
import SubmitBtn from '../submitBth/submitBtn';
import './AddProduct.css';

const createProduct = async (formData) => {
  try {
    const files = formData.getAll('images');
    const images = await Promise.all(
      files.map(async (file) => {
        const imgRef = ref(
          storage,
          `images/${formData.get('name')}/${file.name}`
        );
        await uploadBytes(imgRef, file);
        return getDownloadURL(imgRef);
      })
    );

    const body = {
      name: formData.get('name'),
      price: formData.get('price'),
      city: formData.get('city'),
      description: formData.get('description'),
      imageUrl: images[0],
      images: images,
    };

    const userId = getCookie('user_id');
    body.userId = userId;

    const token = getCookie('token');

    await createNewProduct(body, token);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default function AddProduct() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await createProduct(formData);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add New Product</h1>
      <form className="form" onSubmit={handleSubmit}>
        <TextField label="Name" name="name" className="form-input" variant="outlined" />
        <TextField label="Price" name="price" className="form-input" variant="outlined" />
        <TextField label="City" name="city" className="form-input" variant="outlined" />
        <TextField
          name="images"
          type="file"
          inputProps={{
            multiple: true,
          }}
          className="form-input"
        />
        <textarea
          placeholder="Description..."
          rows={3}
          maxLength={1000}
          name="description"
          className="form-textarea"
        />
        <SubmitBtn className="form-submit-btn" />
      </form>
    </div>
  );
}

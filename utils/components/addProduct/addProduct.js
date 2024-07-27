"use client"
import { useState } from 'react';
import { TextField } from '@mui/material'; // רכיב קלט מטופס של Material-UI
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; // פונקציות לניהול העלאת תמונות ב-Firebase
import { storage } from '@/utils/services/firebase'; // אובייקט האחסון של Firebase
import { getCookie } from 'cookies-next'; // פונקציה לניהול קבצי Cookie
import { createNewProduct } from '../../functions/apiCalls';
import SubmitBtn from '../submitBth/submitBtn';

const createProduct = async (formData) => {
  try {
    const files = formData.getAll('images'); // קבלת כל הקבצים מהשדה "images"

    const images = await Promise.all(
      files.map(async (file) => {
        const imgRef = ref(
          storage,
          `images/${formData.get('name')}/${file.name}` // יצירת נתיב ייחודי לכל תמונה לפי שם המוצר ושם הקובץ
        );
        await uploadBytes(imgRef, file); // העלאת הקובץ ל-Firebase
        return getDownloadURL(imgRef); // החזרת כתובת ה-URL של התמונה
      })
    );

    const body = {
      name: formData.get('name'),
      price: formData.get('price'),
      city: formData.get('city'),
      description: formData.get('description'),
      imageUrl: images[0], // הוספת כתובת התמונה הראשית (הראשונה ברשימה)
      images: images, // הוספת כתובות כל התמונות
    };

    const userId = getCookie('user_id'); // קבלת ה-user_id מהעוגיה
    body.userId = userId; // הוספת ה-user_id לגוף הבקשה

    const token = getCookie('token'); // קבלת ה-token מהעוגיה

    await createNewProduct(body, token); // שליחת הנתונים לשרת ליצירת מוצר חדש
  } catch (error) {
    console.error('Error:', error); // טיפול בשגיאות
  }
};

export default function AddProduct() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await createProduct(formData);
  };

  return (
    <div className="column form-container">
      <h1>Add new product</h1>
      <form className="column form" onSubmit={handleSubmit}>
        <TextField label="name" name="name" />
        <TextField label="price" name="price" />
        <TextField label="city" name="city" />
        <TextField
          name="images"
          type="file"
          inputProps={{
            multiple: true, // מאפשר העלאת קבצים מרובים
          }}
        />
        <textarea
          placeholder="Description..."
          rows={3}
          maxLength={1000}
          name="description"
        />
        <SubmitBtn />
      </form>
    </div>
  );
}

// ייבוא הפונקציות והמודולים הנדרשים
import { TextField } from '@mui/material'; // רכיב קלט מטופס של Material-UI
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'; // פונקציות לניהול העלאת תמונות ב-Firebase
import { storage } from '@/utils/services/firebase'; // אובייקט האחסון של Firebase
import { getCookie } from 'cookies-next'; // פונקציה לניהול קבצי Cookie
import { cookies } from 'next/headers'; // מודול לניהול קבצי Cookie ב-Next.js
import { createNewProduct } from '../../functions/apiCalls';
import SubmitBtn from '../submitBtn';

// פונקציית ברירת המחדל של רכיב AddProductForm
export default function AddProductForm() {
  // פונקציה אסינכרונית ליצירת מוצר חדש
  const createProduct = async (formData) => {
    'use server'; // מציינת שהפונקציה תרוץ בצד השרת
    try {
      // קבלת כל הקבצים מהשדה "images"
      const files = formData.getAll('images'); // "images" צריך להתאים לשם הקלט

      // העלאת כל הקבצים ל-Firebase והחזרת כתובת ה-URL של כל תמונה
      const images = await Promise.all(
        files.map(async (file) => {
          const imgRef = ref(
            storage,
            `images/${formData.get('title')}/${file.name}` // יצירת נתיב ייחודי לכל תמונה לפי שם המוצר ושם הקובץ
          );
          await uploadBytes(imgRef, file); // העלאת הקובץ ל-Firebase
          return getDownloadURL(imgRef); // החזרת כתובת ה-URL של התמונה
        })
      );

      // יצירת אובייקט מהנתונים שנשלחו בטופס
      const body = Object.fromEntries(formData);
      body['mainImg'] = images[0]; // הוספת כתובת התמונה הראשית (הראשונה ברשימה)
      body['images'] = images; // הוספת כתובות כל התמונות

      // שליחת הנתונים לשרת ליצירת מוצר חדש
      await createNewProduct(body, getCookie('token', { cookies }));
    } catch (error) {
      console.error(error); // טיפול בשגיאות
    }
  };

  // החזרת הרכיב
  return (
    <div className="column form-container">
      <h1>Add new product</h1>
      <form className="column form" action={createProduct}>
        {/* שדה קלט לשם המוצר */}
        <TextField label="title" name="title" />
        {/* שדה קלט למחיר המוצר */}
        <TextField label="price" name="price" />
        {/* שדה קלט להעלאת תמונות (עם אפשרות להעלות קבצים מרובים) */}
        <TextField
          name="images"
          type="file"
          inputProps={{
            multiple: true, // מאפשר העלאת קבצים מרובים
          }}
        />
        {/* שדה טקסט לתיאור המוצר */}
        <textarea
          placeholder="Description..."
          rows={3}
          maxLength={1000}
          name="desc"
        />
        {/* כפתור לשליחת הטופס */}
        <SubmitBtn />
      </form>
    </div>
  );
}

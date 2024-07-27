import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const AddProductDialog = ({ open, onClose }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    // טיפול בהוספת המוצר
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>הוסף מוצר חדש</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="כותרת"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="מחיר"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          margin="dense"
          label="קטגוריה"
          type="text"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          margin="dense"
          label="עיר"
          type="text"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {/* הוספת תמונות תהיה חלק מתהליך אחר */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          ביטול
        </Button>
        <Button onClick={handleSubmit} color="primary">
          הוסף
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;

'use client';
import React, { useState } from 'react';
import { Modal, TextField, Button, CircularProgress } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createNewPost } from '../../functions/apiCalls';
import { getCookie } from 'cookies-next';
import { storage } from '../../services/firebase';

export default function PostForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      data['user_id'] = getCookie('user_id');
      data['type'] = 'text'; 

      console.log(data); 

      if (!data['content'] || !data['content'].trim()) {
        console.error('Content is required');
        setLoading(false);
        return;
      }

      data['images'] = await Promise.all(
        formData.getAll('images').map(async (image) => {
          const imageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(imageRef, image);
          return getDownloadURL(imageRef);
        })
      );

      await createNewPost(data, getCookie('token'));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Create Post</Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}
      >
        <form
          onSubmit={handlePostSubmit}
          style={{
            width: 300,
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 4,
            margin: 'auto',
            marginTop: '10%',
            backgroundColor:"aqua"
          }}
        >
          <TextField
            label="What's on your mind?"
            fullWidth
            multiline
            rows={6}
            name="content"
            variant="outlined"
            margin="normal"
          />
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            style={{ marginBottom: '15px', marginTop:'15px' }}
          />
          {loading ? (
            <CircularProgress size={40} />
          ) : (
            <>
              <Button
                variant="contained"
                type="submit"
                style={{ marginRight: '10px' }}
              >
                Post
              </Button>
              <Button
                variant="outlined"
                type="button"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
            </>
          )}
        </form>
      </Modal>
    </div>
  );
}

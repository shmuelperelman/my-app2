'use client';
import React, { useState, useRef } from 'react';
import { Modal, TextField, Button, CircularProgress } from '@mui/material';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createNewPost } from '../../functions/apiCalls';
import { getCookie } from 'cookies-next';
import { storage } from '../../services/firebase';
import { FaImage, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './Post.css';

export default function PostForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prev => [...prev, ...files]);
   
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      data['user_id'] = getCookie('user_id');
      data['type'] = 'text';

      if (!data['content']?.trim()) {
        alert('Please write something before posting');
        setLoading(false);
        return;
      }

      data['images'] = await Promise.all(
        selectedImages.map(async (image) => {
          const imageRef = ref(storage, `images/${Date.now()}-${image.name}`);
          await uploadBytes(imageRef, image);
          return getDownloadURL(imageRef);
        })
      );

      await createNewPost(data, getCookie('token'));
      setIsModalOpen(false);
      setSelectedImages([]);
      setPreviewUrls([]);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-container">
      <Button 
        onClick={() => setIsModalOpen(true)}
        className="create-post-button"
        variant="contained"
      >
        Create New Post
      </Button>

      <Modal 
        open={isModalOpen} 
        onClose={() => !loading && setIsModalOpen(false)}
        className="post-modal"
      >
        <div className="modal-content">
          <form onSubmit={handlePostSubmit} className="post-form">
            <div className="modal-header">
              <h2>Create Post</h2>
              {!loading && (
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="close-button"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="form-content">
              <TextField
                placeholder="What's on your mind?"
                fullWidth
                multiline
                rows={4}
                name="content"
                variant="outlined"
                className="content-input"
              />

              {previewUrls.length > 0 && (
                <div className="image-previews">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="preview-container">
                      <img src={url} alt={`Preview ${index + 1}`} />
                      <button 
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                multiple
                style={{ display: 'none' }}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="add-image-button"
                disabled={loading}
              >
                <FaImage /> Add Images
              </button>

              {loading ? (
                <div className="loading-spinner">
                  <CircularProgress size={24} />
                </div>
              ) : (
                <button type="submit" className="submit-button">
                  <FaPaperPlane /> Post
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
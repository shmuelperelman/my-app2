'use client';
import React, { useState } from 'react';
import { createNewPost } from '@/utils/functions/apiCalls';
import { getCookie } from 'cookies-next';

const PostFormGroup = ({ groupId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getCookie('token');
    const userId = getCookie('user_id');

    const postData = {
      content,
      groupId, // שייך את הפוסט לקבוצה הנבחרת
      userId,
      type: 'text', // לדוגמה, אם מדובר בפוסט טקסטואלי
    };

    try {
      await createNewPost(postData, token);
      setContent('');
      // כאן תוכל להוסיף פעולות נוספות, כמו רענון הפוסטים של הקבוצה.
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostFormGroup;

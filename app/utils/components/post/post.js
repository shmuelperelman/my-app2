"use client"
import React, { useState } from 'react';
import './post.css';

export default function Post() {
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = async () => {
    console.log('New post:', newPost);
    setNewPost('');
  };

  const posts = [
    {
      id: 1,
      author: 'shmuel',
      authorPic: 'https://example.com/alice.jpg',
      content: 'זה הפוסט הראשון שלי!',
      imageUrl: 'https://example.com/post-image.jpg',
      likes: [
        { id: 1, name: 'dan' },
        { id: 2, name: 'nir' },
      ],
      comments: [
        {
          id: 1,
          author: 'dan',
          authorPic: '',
          content: 'פוסט נהדר!',
          createdAt: '2023-05-07T11:00:00Z',
        },
        {
          id: 2,
          author: 'avi',
          authorPic: 'https://pickture.co.il/wp-content/uploads/2023/05/%D7%AA%D7%9E%D7%95%D7%A0%D7%94-%D7%A9%D7%9C-%D7%92%D7%91%D7%A8-16.jpg',
          content: 'מסכים!',
          createdAt: '2023-05-07T11:15:00Z',
        },
      ],
      createdAt: '2023-05-07T10:45:00Z',
      updatedAt: '2023-05-07T10:45:00Z',
    },
  ];

  return (
    <main className="facebook-layout">
      <div className="facebook-content">
        <div className="facebook-post-input">
          <input
            type="text"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
          />
          <button onClick={handlePostSubmit}>Post</button>
        </div>
        <div className="facebook-posts">
          {posts.map((post) => (
            <div key={post.id} className="facebook-post">
              <div className="facebook-post-header">
                <img src={post.authorPic} alt="Author" className="facebook-post-author-pic" />
                <div>
                  <h3>{post.author}</h3>
                  <p>{post.createdAt}</p>
                </div>
              </div>
              <p>{post.content}</p>
              <img src={post.imageUrl} alt="Post" className="facebook-post-image" />
              <div className="facebook-post-likes">
                Likes: {post.likes.map((like) => (
                  <span key={like.id}>{like.name}</span>
                ))}
              </div>
              <div className="facebook-post-comments">
                Comments: {post.comments.map((comment) => (
                  <div key={comment.id} className="facebook-comment">
                    <img src={comment.authorPic} alt="Commenter" className="facebook-comment-author-pic" />
                    <div>
                      <p><strong>{comment.author}</strong>: {comment.content}</p>
                      <p>{comment.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

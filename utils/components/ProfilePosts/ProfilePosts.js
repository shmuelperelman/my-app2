"use client"
import { getAllUserPosts } from '@/utils/functions/apiCalls';
import React, { useEffect, useState } from 'react';

const ProfilePosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getAllUserPosts(userId);
        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="profile-posts">
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;

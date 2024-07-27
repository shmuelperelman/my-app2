'use client';
import React, { useState, useEffect } from 'react';
import './AllPost.css';
import { getAllPostsExceptUser } from '../../functions/apiCalls';
import { getCookie } from 'cookies-next';
import { FaThumbsUp, FaComment } from 'react-icons/fa';

const ProfilePosts1 = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = getCookie('token');
        const userId = getCookie('user_id');
        const fetchedPosts = await getAllPostsExceptUser(userId, token);
        setPosts(fetchedPosts.data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post._id === postId) {
        const updatedLikes = post.likes ? post.likes + 1 : 1;
        return { ...post, likes: updatedLikes };
      }
      return post;
    }));
  };

  const handleCommentChange = (e, postId) => {
    setComments({ ...comments, [postId]: e.target.value });
  };

  const handleAddComment = (postId) => {
    const userId = getCookie('user_id');
    const userName = getCookie('user_name');
    const userProfilePictureURL = getCookie('user_profile_picture');

    if (!comments[postId]?.trim()) return;

    const newComment = {
      userId,
      userName,
      userProfilePictureURL,
      text: comments[postId],
    };

    setPosts(posts.map(post => {
      if (post._id === postId) {
        return { ...post, comments: [...(post.comments || []), newComment] };
      }
      return post;
    }));
    setComments({ ...comments, [postId]: '' });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="posts-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            <div className="post-author">
              <img alt={post.authorName} src={post.authorProfilePictureURL} className="author-avatar" />
              <span>{post.authorName}</span>
            </div>
            <p className="post-content">{post.content}</p>
            {post.images && post.images.length > 0 && (
              <div className="post-images">
                {post.images.map((image, index) => (
                  <img key={index} src={image} alt={`Post image ${index + 1}`} />
                ))}
              </div>
            )}
            <div className="post-details">
              <div className="likes">
                <FaThumbsUp onClick={() => handleLike(post._id)} />
                {post.likes || 0} Likes
              </div>
              <div className="comments">
                <FaComment />
                {post.comments?.length || 0} Comments
                {post.comments?.map((comment, index) => (
                  <div key={index} className="comment">
                    <img src={comment.userProfilePictureURL} alt={comment.userName} className="comment-avatar" />
                    <div>
                      <strong>{comment.userName}</strong>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))}
                <div className="add-comment">
                  <input
                    type="text"
                    value={comments[post._id] || ''}
                    onChange={(e) => handleCommentChange(e, post._id)}
                    placeholder="Add a comment"
                  />
                  <button onClick={() => handleAddComment(post._id)}>Comment</button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default ProfilePosts1;

"use client";
import React, { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import './ProfilePosts.css';
import { getAllUserPosts, deletePost, updatePost } from '@/utils/functions/apiCalls';
import { FaComment, FaThumbsUp, FaEdit, FaTrash } from 'react-icons/fa';
import Image from 'next/image';

const ProfilePosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  const fetchPosts = async () => {
    try {
      const token = getCookie('token');
      const fetchedPosts = await getAllUserPosts(userId, token);
      setPosts(fetchedPosts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setEditContent(post.content);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditContent('');
  };

  const handleUpdatePost = async (postId) => {
    try {
      const token = getCookie('token');
      const updatedPost = await updatePost(postId, { content: editContent }, token);
      setPosts(posts.map(post => post._id === postId ? updatedPost : post));
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = getCookie('token');
        await deletePost(postId, token);
        setPosts(posts.filter(post => post._id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleDeleteImage = async (postId, imageUrl) => {
    try {
      const token = getCookie('token');
      const updatedPost = await updatePost(postId, { removeImage: imageUrl }, token);
      setPosts(posts.map(post => post._id === postId ? updatedPost : post));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="posts-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            <div className="post-header">
              <img alt={post.userDetails?.username} src={post.userDetails?.profilePictureURL} className="post-profile-pic" />
              <div>
                <div className="post-username">{post.userDetails?.username}</div>
                <div className="post-date">{post.created_at}</div>
              </div>
              {userId === getCookie('user_id') && (
                <div className="post-actions">
                  <button onClick={() => handleEdit(post)} className="edit-button">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeletePost(post._id)} className="delete-button">
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
            {editingPost === post._id ? (
              <div className="edit-post">
                <textarea 
                  value={editContent} 
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={() => handleUpdatePost(post._id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="post-content">{post.content}</div>
            )}
            {post.images && post.images.length > 0 && (
              <div className="post-images">
                {post.images.map((image, index) => (
                  <div key={index} className="image-container">
                    <img src={image} alt={`Post image ${index + 1}`} className="post-image" />
                    {userId === getCookie('user_id') && (
                      <button onClick={() => handleDeleteImage(post._id, image)} className="delete-image-button">
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="post-actions">
              <button className="like-button" onClick={() => handleLike(post._id)}>
                <FaThumbsUp /> {post.likes || 0} Likes
              </button>
              <button className="comment-button">
                <FaComment /> {post.comments?.length || 0} Comments
              </button>
            </div>
            <div className="comments-section">
              {post.comments?.map((comment, index) => (
                <div key={index} className="comment">
                  <Image src={comment.userProfilePictureURL} alt={comment.userName} className="comment-avatar" />
                  <div className="comment-content">
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
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default ProfilePosts;
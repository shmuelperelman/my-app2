import axios from 'axios';

const SERVER_URL = 'http://localhost:3004';


export async function login(body) {
  try {
    const response = await axios.post(`${SERVER_URL}/users/login`, body);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function register(body) {
  try {
    console.log(body);
    const response = await axios.post(`${SERVER_URL}/users/register`, body);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getAllUserPosts( userId,token) {
  try {
    console.log('Sending request with userId:', userId); // לוג לבדיקה

    const response = await axios.get(`${SERVER_URL}/posts/all/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Fetched posts:', response.data); // לוג לבדיקה
    return response.data;
  } catch (error) {
    console.error('Error in getAllUserPosts:', error);
    throw error;
  }
}

export async function createNewPost(body, token) {
  try {
    const userId = body.user_id;
    const response = await axios.post(`${SERVER_URL}/posts/${userId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

// פוסטים
export async function getAllSPPosts(token) {
  try {
    const response = await fetch(`${SERVER_URL}/posts`, {
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deletePost(_id, token) {
  try {
    const response = await axios.delete(`${SERVER_URL}/posts/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function updatePost(_id, updateData, token) {
  try {
    const response = await axios.put(`${SERVER_URL}/posts/${_id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}


export async function getPostById(_id, token) {
  try {
    const response = await fetch(`${SERVER_URL}/posts/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUserById(userId, token) {
  try {
    const response = await axios.get(`${SERVER_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Fetched user data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function updateUserProfile(userId, token, data) {
  try {
    const response = await axios.put(`${SERVER_URL}/users/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-Type': 'multipart/form-data'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

export async function getAllUsers(token, userId) {
  try {
    console.log('Fetching users with userId:', userId);
    const response = await fetch(`${SERVER_URL}/users/${userId}/all-except`, { // עדכון URL
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const data = await response.json();
    console.log('API response data:', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}


export async function getAllPostsExceptUser(userId, token) {
  try {
    const response = await fetch(
      `${SERVER_URL}/posts/allPostsExceptUser/${userId}`,
      {
        cache: 'no-cache',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Error response:', response); 
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); 
    console.log('API response data:', data); 
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error); 
    throw error;
  }
}

export async function getUserFriends( userId,token) {
  try {
    const response = await fetch(`${SERVER_URL}/users/${userId}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
   
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addGroupToUser(userId, groupId, token) {
  try {
    const response = await axios.put(
      `${SERVER_URL}/users/${userId}/groups`,
      { groupId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeGroupFromUser(userId, groupId, token) {
  try {
    const response = await axios.delete(
      `${SERVER_URL}/users/${userId}/groups/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUsersInGroup(groupId, token) {
  try {
    const response = await fetch(
      `${SERVER_URL}/users/groups/${groupId}/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}


export async function sendMessageToServer(message) {
  try {
    const response = await axios.post(`${SERVER_URL}/messages`, message);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error(error);
  }
}

// קבוצה
export async function getGroupsUserIsMemberOf(userId, token) {
  try {
    const response = await axios.get(`${SERVER_URL}/groups/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching member groups:', error);
    throw error;
  }
}

export async function createGroup(groupData, token) {
  try {
    const response = await axios.post(`${SERVER_URL}/groups`, groupData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
}




export async function likePost(postId, token) {
  try {
    const response = await fetch(`${SERVER_URL}/posts/like/${postId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error('Error response:', response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
}

export async function addComment(postId, comment, token) {
  try {
    const response = await fetch(`${SERVER_URL}/posts/comment/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    });

    if (!response.ok) {
      console.error('Error response:', response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

// יצירת צ'אט חדש או קבלת צ'אט קיים
export async function createChat(participants) {
  const token = getCookie('token');
  try {
    const response = await axios.post(
      `${SERVER_URL}/chats`,
      { participants },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
}

// שליפת כל הצ'אטים של משתמש
export async function getUserChats(userId) {
  const token = getCookie('token');
  try {
    const response = await axios.get(`${SERVER_URL}/chats/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user chats:', error);
    throw error;
  }
}

// שליפת הודעות של צ'אט מסוים
export async function getChatMessages(chatId) {
  const token = getCookie('token');
  try {
    const response = await axios.get(`${SERVER_URL}/messages/${chatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
}



// קריאה להוספת מוצר חדש
export async function createNewProduct(body, token) {
  try {
    const response = await axios.post(`${SERVER_URL}/market/products`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error(error);
  }
}


export async function getAllProducts(token) {
  try {
    const response = await axios.get(`${SERVER_URL}/market/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}


export const getProductById = async (id, token) => {
  try {
    console.log(`Fetching product with ID: ${id}`);
    console.log(`Using token: ${token}`);

    const response = await axios.get(`${SERVER_URL }/market/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Detailed error in getProductById:', error);
    console.error('Response error data:', error.response?.data);
    console.error('Response error status:', error.response?.status);
    console.error('Response error headers:', error.response?.headers);
    throw error;
  }
};


// קריאה למחיקת מוצר
export async function deleteProduct(productId, token) {
  try {
    const response = await axios.delete(`${SERVER_URL}/market/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error(error);
  }
}
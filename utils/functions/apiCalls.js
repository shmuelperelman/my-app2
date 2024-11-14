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

export async function requestPasswordReset(email) {
  try {
    const response = await axios.post(`${SERVER_URL}/users/forgot-password`, { email });
    return response.data; 
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
}

export async function verifyResetToken(token) {
  try {
    const response = await axios.get(`${SERVER_URL}/users/reset-password/${token}`);
    return response.data; 
  } catch (error) {
    console.error('Error verifying reset token:', error);
    throw error;
  }
}

export async function resetPassword(token, newPassword) {
  try {
    const response = await axios.post(`${SERVER_URL}/users/reset-password/${token}`, { password: newPassword });
    return response.data; 
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}

export async function getAllUserPosts( userId,token) {
  try {
    console.log('Sending request with userId:', userId); 

    const response = await axios.get(`${SERVER_URL}/posts/all/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Fetched posts:', response.data); 
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
    const response = await fetch(`${SERVER_URL}/users/${userId}/all-except`, { 
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
    const response = await axios.post(`${SERVER_URL}/market`, body, {
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



export const getAllProducts = async (token) => {
  try {
    const response = await axios.get('http://localhost:3004/market', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};



export const getProductById = async (id, token) => {
  try {
    // בדיקה אם ה-ID וה-Token לא ריקים
    if (!id) {
      throw new Error('Product ID is missing.');
    }
    if (!token) {
      throw new Error('Authentication token is missing.');
    }

    console.log(`Fetching product with ID: ${id}`);
    console.log(`Using token: ${token}`);

    const response = await axios.get(`${SERVER_URL}/market/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // בדיקה אם התגובה תקינה ויש בה נתונים
    if (!response || !response.data) {
      throw new Error('Invalid response from server.');
    }

    return response.data;
  } catch (error) {
    // טיפול בשגיאות בצורה מקיפה
    console.error('Error in getProductById:', error.message);

    if (error.response) {
      // שגיאה מהשרת
      console.error('Response error data:', error.response.data);
      console.error('Response error status:', error.response.status);
      console.error('Response error headers:', error.response.headers);

      if (error.response.status === 404) {
        throw new Error('Product not found.');
      } else if (error.response.status === 401) {
        throw new Error('Unauthorized access. Please check your token.');
      } else {
        throw new Error('An error occurred while fetching the product.');
      }
    } else if (error.request) {
      // לא התקבלה תשובה מהשרת
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check your network.');
    } else {
      // שגיאה בהגדרת הבקשה
      console.error('Error setting up the request:', error.message);
      throw new Error('Error setting up the request.');
    }
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

// קבלת כל הקבוצות
export async function getAllGroups(token) {
  try {
    const response = await axios.get(`${SERVER_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
}

// קבלת קבוצה לפי מזהה
export async function getGroupById(groupId, token) {
  try {
    const response = await axios.get(`${SERVER_URL}/groups/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching group:', error);
    throw error;
  }
}

// יצירת קבוצה חדשה
export async function createGroup(groupData, token) {
  try {
    console.log('Sending groupData:', groupData);
    const response = await axios.post(`${SERVER_URL}/groups`, groupData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Group creation response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
}

// עדכון קבוצה לפי מזהה
export async function updateGroup(groupId, groupData, token) {
  try {
    const response = await axios.put(`${SERVER_URL}/groups/${groupId}`, groupData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating group:', error);
    throw error;
  }
}

// מחיקת קבוצה לפי מזהה
export async function deleteGroup(groupId, token) {
  try {
    const response = await axios.delete(`${SERVER_URL}/groups/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
}

// הוספת חבר לקבוצה
export async function addMemberToGroup(groupId, userId, token) {
  try {
    const response = await axios.put(`${SERVER_URL}/groups/${groupId}/addMember`, { userId }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding member to group:', error);
    throw error;
  }
}

// הסרת חבר מקבוצה
export async function removeMemberFromGroup(groupId, userId, token) {
  try {
    const response = await axios.put(`${SERVER_URL}/groups/${groupId}/removeMember`, { userId }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing member from group:', error);
    throw error;
  }
}

// קבלת שמות כל הקבוצות
export async function getGroupNames(token) {
  try {
    const response = await axios.get(`${SERVER_URL}/groups/names`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching group names:', error);
    throw error;
  }
}

export async function getGroupPosts(groupId, token) {
  try {
    const response = await axios.get(`${SERVER_URL}/groups/${groupId}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching group posts:', error);
    throw error;
  }
}
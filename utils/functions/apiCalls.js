import axios from 'axios';

const SERVER_URL = 'http://localhost:3001';
// const SERVER_URL = "https://express-1-p0in.onrender.com";

async function fetchData(url, token, method = 'GET', body = null) {
  try {
    const config = {
      method,
      url: `${SERVER_URL}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: body,
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error(`Error in fetchData for ${url}:`, error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message);
  }
}

// פוסטים
export async function getAllSPPosts(token) {
  return await fetchData('/posts', token);
}

export async function getAllUserPosts(userId, token) {
  return await fetchData(`/posts/user/${userId}`, token);
}

export async function createNewPost(body, token) {
  return await fetchData(`/posts/${body.user_id}`, token, 'POST', body);
}

export async function deletePost(postId, token) {
  return await fetchData(`/posts/${postId}`, token, 'DELETE');
}

export async function getPostById(postId, token) {
  return await fetchData(`/posts/${postId}`, token);
}

// משתמשים
export async function getAllUsers(token, userId) {
  return await fetchData(`/users/${userId}/all-except`, token);
}

export async function getUserFriends(userId, token) {
  return await fetchData(`/users/${userId}/friends`, token);
}

export async function getUserById(userId, token) {  
  return await fetchData(`/users/${userId}`, token);
}

export async function addGroupToUser(userId, groupId, token) {
  return await fetchData(`/users/${userId}/groups`, token, 'PUT', { groupId });
}

export async function removeGroupFromUser(userId, groupId, token) {
  return await fetchData(`/users/${userId}/groups/${groupId}`, token, 'DELETE');
}

export async function getUsersInGroup(groupId, token) {
  return await fetchData(`/users/groups/${groupId}/users`, token);
}

// מוצרים
export async function createNewProduct(body, token) {
  return await fetchData(`/products`, token, 'POST', body);
}

export async function sendMessageToServer(message) {
  return await fetchData(`/messages`, null, 'POST', message);
}

// קבוצה
export async function getGroupsUserIsMemberOf(userId, token) {
  return await fetchData(`/groups/user/${userId}`, token);
}

export async function createGroup(groupData, token) {
  return await fetchData(`/groups`, token, 'POST', groupData);
}

// אימות משתמש
export async function login(body) {
  return await fetchData(`/users/login`, null, 'POST', body);
}

export async function register(body) {
  return await fetchData(`/users/register`, null, 'POST', body);
}

// פוסטים למשתמש חוץ מהמשתמש הספציפי
export async function getAllPostsExceptUser(userId, token) {
  return await fetchData(`/posts/allPostsExceptUser/${userId}`, token);
}

export async function likePost(postId, token) {
  return await fetchData(`/posts/like/${postId}`, token, 'POST');
}

export async function addComment(postId, comment, token) {
  return await fetchData(`/posts/comment/${postId}`, token, 'POST', { comment });
}

// צ'אטים
export async function createChat(participants) {
  const token = getCookie('token');
  return await fetchData(`/chats`, token, 'POST', { participants });
}

export async function getUserChats(userId) {
  const token = getCookie('token');
  return await fetchData(`/chats/${userId}`, token);
}

export async function getChatMessages(chatId) {
  const token = getCookie('token');
  return await fetchData(`/messages/${chatId}`, token);
}

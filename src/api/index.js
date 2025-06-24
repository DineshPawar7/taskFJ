import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }
  return req;
});

export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);

export const fetchPosts = () => API.get('/posts/all');
export const createPost = (newPost) => API.post('/posts/create', newPost);
export const deletePost = (id) => API.delete(`/posts/admin/${id}`);


export const fetchAllUsers = () => API.get('/users/admin/all');
export const deleteUser = (id) => API.delete(`/users/admin/user/${id}`);

